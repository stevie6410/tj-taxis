import { Component, OnInit, Input } from '@angular/core';

import { Booking } from '../../shared/model/booking';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  @Input() booking: Booking;

  constructor() { }

  ngOnInit() {
  }

}
