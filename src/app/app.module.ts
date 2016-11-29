import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2/index';

import { firebaseConfig } from '../environments/firebase.config';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DriversModule } from './drivers/drivers.module';
import { OperatorsModule } from './operators/operators.module';
import { routerConfig } from './router.config';

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

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
    RouterModule.forRoot(routerConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
