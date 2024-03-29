import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { WeekDay } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/Course';
import { Event } from '../../model/Event';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule = new Array(7);
  labels: string[] = new Array(7);

  days = new Array(7);
  range = 7;
  today: Event[];

  showBiweekly = true;
  semesterStart: any;

  courses: Course[];

  @Input()
  canEdit = false;

  @Input()
  todayOnly = false;

  @Output()
  editEvent: EventEmitter<Event> = new EventEmitter();

  constructor(
    private flashMessage: FlashMessagesService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const labels = [];

    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.userService.getUser().subscribe(user => {
      this.semesterStart = moment(user.start);
      this.semesterStart.subtract(1, 'months');
    });

    for (let i = 0; i < 7; i++) {
      this.scheduleService.getSchedule(i).subscribe(schedule => {
        labels[i] = WeekDay[i];

        this.schedule[i] = {
          weekday: i,
          events: schedule.sort((a, b) => {
            const timeA = parseInt(a.start.replace(':', ''), 10);
            const timeB = parseInt(b.start.replace(':', ''), 10);
            return timeA - timeB;
          })
        };

        this.days[i] = this.schedule[i];

        const today = new Date().getDay();
        if (today === this.schedule[i].weekday) {
          this.today = this.schedule[i];
        }
      });
    }
    this.schedule.sort((a, b) => b.day - a.day);

    this.labels = labels;

    this.changeRange(this.range);
  }

  changeRange(range: number) {
    this.range = range;
    if (this.range === 1) {
      const today = new Date();
      this.days = [this.schedule[today.getDay()]];
    } else if (this.range === 5) {
      this.days = this.schedule.slice(1, 6);
    } else if (this.range === 7) {
      this.days = this.schedule;
    }
  }

  onDelete(event) {
    if (confirm(`Delete '${event.name}'?`)) {
      this.scheduleService.deleteEvent(parseInt(event.day, 10), event);
      this.flashMessage.show('Event deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }

  onEdit(event: Event) {
    this.editEvent.emit(event);
  }

  onWeekClick(week: number) {
    console.log(week);
  }

  timestringToDate(timestring: string): Date {
    const date = new Date();
    date.setHours(
      parseInt(timestring.slice(0, 2), 10),
      parseInt(timestring.slice(3), 10)
    );
    return date;
  }

  getWeekDay(): string {
    const today = new Date();
    return WeekDay[today.getDay()];
  }

  getWeek(): number {
    const today = moment();
    const diff = today
      .startOf('day')
      .startOf('week')
      .diff(this.semesterStart.startOf('day').startOf('week'), 'weeks');

    return (Math.abs(diff) % 2) + 1;
  }

  isSameWeek(event: Event): boolean {
    if (event.biweekly) {
      const thisWeek = this.getWeek();
      const week = parseInt(event.week, 10);
      return thisWeek === week;
    } else {
      return true;
    }
  }

  getCourseCode(event: Event): string {
    const courses = this.courses.filter(course =>
      event.name.includes(course.name)
    );

    return courses.length > 0 ? courses[0].code : '';
  }

  getCourseColor(event: Event): string {
    const courses = this.courses.filter(course =>
      event.name.includes(course.name)
    );
    return courses.length > 0 ? courses[0].color : 'default';
  }
}
