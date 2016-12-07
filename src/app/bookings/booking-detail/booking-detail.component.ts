import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BookingService } from '../../shared/service/booking.service';
import { Booking } from '../../shared/model/booking';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  @Input() booking: Booking;

  constructor(private route: ActivatedRoute, private bookingService: BookingService) {
    this.route.params
      .switchMap((params: Params) => this.bookingService.getBooking(params['id']))
      .subscribe(
        (booking: Booking) => {
          this.booking = booking;
        }
      );
  }

  ngOnInit() {
  }

}
