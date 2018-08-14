import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../model/Event';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ScheduleService } from '../../services/schedule.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule = new Array(7);
  week: Event[][];
  labels: string[];
  range = 5;

  @Input()
  canEdit = false;

  constructor(
    private flashMessage: FlashMessagesService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    const labels = [];
    for (let i = 0; i < 7; i++) {
      this.scheduleService.getSchedule(i).subscribe(schedule => {
        labels.push(WeekDay[i]);
        this.schedule[i] = schedule;
      });
    }
    this.labels = labels;
  }

  changeRange(range: number) {
    if (this.range === range) return;

    this.range = range;
    if (this.range === 1) {
      const today = new Date();
      this.week = this.schedule.slice(today.getDay(), (today.getDay() + 1) % 7);
    } else if (this.range === 5) {
      this.week = this.schedule.slice(1, 6);
    } else if (this.range === 7) {
      this.week = this.schedule;
    }
  }
}
