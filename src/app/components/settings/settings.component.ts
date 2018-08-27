import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  start: string;

  constructor(
    private userService: UserService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.start = user.start;
    });
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      this.userService.updateUser(value);
      // Show message
      this.flashMessage.show('User start date set', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }
}
