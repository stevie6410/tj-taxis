import { Component, OnInit, Input } from '@angular/core';

import { Booking } from '../../shared/model/booking';

@Component({
  selector: 'app-booking-detail-map',
  templateUrl: './booking-detail-map.component.html',
  styleUrls: ['./booking-detail-map.component.css']
})
export class BookingDetailMapComponent implements OnInit {

  @Input() booking: Booking;

  public map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    
    this.map = new google.maps.Map(document.getElementById('booking-detail-map'), {
      zoom: 8,
      center: { lat: 51.520868, lng: -0.129756 }
    });

  }

}
