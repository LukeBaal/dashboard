import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/Event';
import { ScheduleService } from '../../services/schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: Event = {
    name: '',
    location: '',
    time: ''
  };

  day: number;

  constructor(
    private scheduleService: ScheduleService,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.day = this.route.snapshot.params['day'];
  }

  onSubmit({ value, valid }: { value: Event; valid: boolean }) {
    console.log('submitting...');
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      this.scheduleService.newSchedule(this.day, value);
      // Show message
      this.flashMessage.show('New event added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/schedule']);
    }
  }
}
