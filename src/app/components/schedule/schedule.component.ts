import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { WeekDay } from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule = new Array(7);
  labels: string[] = new Array(7);

  days = new Array(7);
  dayLabels: string[] = new Array(7);
  range = 7;

  @Input()
  canEdit = false;

  @Output()
  editEvent: EventEmitter<Event> = new EventEmitter();

  constructor(
    private flashMessage: FlashMessagesService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    const labels = [];
    const dayLabels = [];
    for (let i = 0; i < 7; i++) {
      this.scheduleService.getSchedule(i).subscribe(schedule => {
        labels[i] = WeekDay[i];

        dayLabels[i] = WeekDay[i];
        this.days[i] = this.schedule[i];
        this.schedule[i] = schedule;
      });
    }
    this.schedule.sort((a, b) => b.day - a.day);

    this.labels = labels;
    this.dayLabels = dayLabels;
    this.changeRange(this.range);
  }

  changeRange(range: number) {
    this.range = range;
    if (this.range === 1) {
      const today = new Date();
      this.days = this.schedule.slice(today.getDay(), (today.getDay() + 1) % 7);
      this.dayLabels = this.labels.slice(
        today.getDay(),
        (today.getDay() + 1) % 7
      );
    } else if (this.range === 5) {
      this.days = this.schedule.slice(1, 6);
      this.dayLabels = this.labels.slice(1, 6);
    } else if (this.range === 7) {
      this.days = this.schedule;
      this.dayLabels = this.labels;
    }
  }

  onDelete(day: number, event) {
    if (confirm('Are you sure?')) {
      this.scheduleService.deleteEvent(day, event);
      this.flashMessage.show('Event deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }

  onEdit(event: Event) {
    this.editEvent.emit(event);
  }
}
