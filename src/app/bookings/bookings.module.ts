import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BookingsComponent } from './bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AgmCoreModule } from 'angular2-google-maps/core';

import { BookingService } from '../shared/service/booking.service';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACWmAKhbQkLQC6oY148RNARLquRaYaZmw'
    })
  ],
  declarations: [
    BookingsComponent,
    BookingDetailComponent
  ],
  providers: [
    BookingService
  ],
  exports: [
    BookingsComponent
  ]
})
export class BookingsModule { }
