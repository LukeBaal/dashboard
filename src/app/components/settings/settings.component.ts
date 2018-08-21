import { Component, OnInit } from '@angular/core';
import { Link } from '../../model/Link';
import { LinkService } from '../../services/link.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Semester } from '../../model/Semester';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  links: Link[];
  link: Link = {
    id: '',
    label: '',
    url: '',
    icon: ''
  };

  semester: Semester = {
    start: ''
  };

  update = false;

  constructor(
    private linkService: LinkService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.linkService.getLinks().subscribe(links => {
      this.links = links;
    });
  }

  onSubmit({ value, valid }: { value: Link; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Check if updating existing event, or new event being added
      if (this.update) {
        value.id = this.link.id;
        this.linkService.updateLink(value);
        // Show message
        this.flashMessage.show('Link updated', {
          cssClass: 'alert-warning',
          timeout: 4000
        });
        this.update = false;
      } else {
        this.linkService.newLink(value);
        // Show message
        this.flashMessage.show('New link added', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      }
    }
    this.link = {
      id: '',
      label: '',
      url: '',
      icon: ''
    };
  }

  onEdit(link: Link) {
    this.link = link;
    this.update = true;
  }

  onDelete(link: Link) {
    if (confirm('Are you sure?')) {
      this.linkService.deleteLink(link);
      this.flashMessage.show('Link removed', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }

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
