import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {Router} from '@angular/router';
import {RouterNavLinks} from './others/router-nav-links';
import {RouterNavLink} from './others/router-nav-link';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navLinks: RouterNavLink[];
  constructor(private router: Router) {

  }

  ngOnInit(): void {
      this.navLinks = new RouterNavLinks(this.router.config).links;
  }
}
