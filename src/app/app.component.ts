import { Component, ViewEncapsulation } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';

  constructor(public af: AngularFire) {

  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

  logUser() {
    console.log(this.af);
  }

}
