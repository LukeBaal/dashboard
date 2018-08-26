import { Component, OnInit } from '@angular/core';
import { Link } from '../../model/Link';
import { LinkService } from '../../services/link.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Semester } from '../../model/Semester';
import { DateService } from '../../services/date.service';
import { Course } from '../../model/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  // onStartSubmit({ value, valid }: { value: Semester; valid: boolean }) {
  //   if (!valid) {
  //     // Show error
  //     this.flashMessage.show('Please fill out the form correctly', {
  //       cssClass: 'alert-danger',
  //       timeout: 4000
  //     });
  //   } else {
  //     this.dateService.newSemester(value);
  //     // Show message
  //     this.flashMessage.show('Semester start date set', {
  //       cssClass: 'alert-success',
  //       timeout: 4000
  //     });
  //   }
  // }
}
