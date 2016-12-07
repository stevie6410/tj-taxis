import { Component, OnInit } from '@angular/core';

import { Booking } from '../shared/model/booking';
import { BookingService } from '../shared/service/booking.service';
import { GMapsService } from '../shared/service/gmaps.service';

// declare var google: any;

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  public bookings: Booking[];
  public selectedBooking: Booking;
  public map: google.maps.Map;

  constructor(private bookingService: BookingService, private gMapsService: GMapsService) { }

  ngOnInit() {
    this.bookingService.allBookings().subscribe(
      data => { this.bookings = data; }
    );
    this.initMap();
  }

  initMap() {

    if (!google) {
      console.log('Google Api could not be loaded');
    } else {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 51.520868, lng: -0.129756 }
      });

      // var directionsService = new google.maps.DirectionsService;
      // var directionsDisplay = new google.maps.DirectionsRenderer;
      // directionsDisplay.setMap(this.map);
      // calculateAndDisplayRoute(directionsService, directionsDisplay);

      // function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      //   var waypts = [];
      //   var checkboxArray: any[] = [
      //     'winnipeg', 'regina', 'calgary'
      //   ];
      //   for (var i = 0; i < checkboxArray.length; i++) {

      //     waypts.push({
      //       location: checkboxArray[i],
      //       stopover: true
      //     });

      //   }

      //   directionsService.route({
      //     origin: { lat: 41.85, lng: -87.65 },
      //     destination: { lat: 49.3, lng: -123.12 },
      //     waypoints: waypts,
      //     optimizeWaypoints: true,
      //     travelMode: 'DRIVING'
      //   }, function (response, status) {
      //     if (status === 'OK') {
      //       directionsDisplay.setDirections(response);
      //     } else {
      //       window.alert('Directions request failed due to ' + status);
      //     }
      //   });
      // }
    }

  }

  selectionChanged(booking: Booking) {
    this.selectedBooking = booking;
  }

  updatePickupAddress(booking: Booking) {
    //Get the address based on the postcode
    this.gMapsService.getLocationFromAddress(booking.pickupPostcode)
      .subscribe(
      (res) => {
        this.bookingService.updateBooking(booking.$key, { 'pickupAddress': res.formatted_address });
      });
  }

  addressSearch(address: string) {
    this.gMapsService.getLocationFromAddress(address)
      .subscribe(result => this.gMapsService.setMarker(this.map, result.geometry.location, result.formatted_address));
  }

  placeSearch(address: string) {
    this.gMapsService.placeSearch(this.map.getCenter(), 5000, address, this.map)
      .subscribe(results => results.forEach(result => this.gMapsService.setMarker(this.map, result.geometry.location, result.name)));
  }
}


