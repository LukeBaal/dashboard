import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LinkService } from '../../services/link.service';
import { Link } from '../../model/Link';

@Component({
  selector: 'app-link-settings',
  templateUrl: './link-settings.component.html',
  styleUrls: ['./link-settings.component.css']
})
export class LinkSettingsComponent implements OnInit {
  links: Link[];
  link: Link = {
    id: '',
    label: '',
    url: '',
    icon: ''
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
}
