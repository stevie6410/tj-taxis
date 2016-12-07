import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BookingsComponent } from './bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { BookingService } from '../shared/service/booking.service';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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

export const bookingsRoutes: Route[] = [
  {
    path: 'bookings', component: BookingsComponent, children: [
      { path: ':id', component: BookingDetailComponent }
    ]
  }
];
