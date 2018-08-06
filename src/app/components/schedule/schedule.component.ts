import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/Event';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  canEdit = false;
  schedule: Event[];
  today = new Date();

  constructor(
    private flashMessage: FlashMessagesService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.scheduleService
      .getSchedule(this.today.getDay())
      .subscribe(schedule => {
        this.schedule = schedule;
      });
  }
}
