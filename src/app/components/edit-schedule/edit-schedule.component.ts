import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Event } from '../../model/Event';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  week = [0, 1, 2, 3, 4, 5, 6];
  range = 7;
  event: Event = {
    id: '',
    name: '',
    location: '',
    crn: null,
    day: 0,
    start: '',
    end: ''
  };

  biweekly = false;
  update = false;

  constructor(
    private scheduleService: ScheduleService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Event; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Check if updating existing event, or new event being added
      if (this.update) {
        value.id = this.event.id;
        this.scheduleService.updateEvent(value.day, value);
        // Show message
        this.flashMessage.show('Event updated', {
          cssClass: 'alert-warning',
          timeout: 4000
        });
        this.update = false;
      } else {
        this.scheduleService.newSchedule(value.day, value);
        // Show message
        this.flashMessage.show('New event added', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      }
    }
  }

  onEditEvent(event) {
    event.day = parseInt(event.day);
    this.event = event;
    this.update = true;
  }
}
