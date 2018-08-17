import { Component, OnInit } from '@angular/core';
import { Link } from '../../model/Link';
import { LinkService } from '../../services/link.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  links: Link[];
  loggedIn = false;

  constructor(
    private linkService: LinkService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    this.linkService.getLinks().subscribe(links => {
      this.links = links;
    });
    console.log(this.loggedIn);
  }
}
