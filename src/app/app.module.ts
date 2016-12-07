import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2/index';

import { firebaseConfig } from '../environments/firebase.config';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DriversModule, driversRouterConfig } from './drivers/drivers.module';
import { OperatorsModule, operatorsRouterConfig } from './operators/operators.module';
import { BookingsModule, bookingsRoutes } from './bookings/bookings.module';
import { GMapsService } from './shared/service/gmaps.service';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

export const routerConfig: Route[] = [
  { path: '', component: DashboardComponent },
  ...driversRouterConfig,
  ...operatorsRouterConfig,
  ...bookingsRoutes
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardModule,
    DriversModule,
    OperatorsModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(routerConfig),
    BookingsModule
  ],
  providers: [
    GMapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


