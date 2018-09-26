import { Component, OnInit } from '@angular/core';
import { Link } from '../../model/Link';
import { LinkService } from '../../services/link.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  links: Link[];
  loggedIn = false;

  constructor(
    private linkService: LinkService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    this.linkService.getLinks().subscribe(links => {
      this.links = links;
    });
  }
}
