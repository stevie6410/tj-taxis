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
      data => {
        // console.log(data);
        this.bookings = data;
      }
    );

    this.initMap();
  }

  initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(this.map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      var waypts = [];
      var checkboxArray: any[] = [
        'winnipeg', 'regina', 'calgary'
      ];
      for (var i = 0; i < checkboxArray.length; i++) {

        waypts.push({
          location: checkboxArray[i],
          stopover: true
        });

      }

      directionsService.route({
        origin: { lat: 41.85, lng: -87.65 },
        destination: { lat: 49.3, lng: -123.12 },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
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
        console.log(res);
        this.bookingService.updateBooking(booking.$key, { 'pickupAddress': res.formatted_address });
      });
  }

  addressSearch(address: string) {
    this.gMapsService.getLocationFromAddress(address).subscribe(
      (res) => {
        console.log(res.formatted_address);
      }
    );
  }
}


  // getLocationForAddress(address: string): google.maps.GeocoderResult {
  //   var geocoder = new google.maps.Geocoder;
  //   var result;
  //   geocoder.geocode({ 'address': address }, function (results, status) {
  //     if (status.toString() == 'OK') {
  //       console.log(results);
  //       result = results[0];
  //       console.log(result);
  //     } else {
  //       console.error('Gecode was not successful: ' + status);
  //     }
  //   });
  //   return result;
  // }

  // geoCode(address: string) {
  //   var map = this.map;
  //   var geocoder: google.maps.Geocoder;
  //   geocoder = new google.maps.Geocoder;
  //   geocoder.geocode({ 'address': address }, function (results, status) {
  //     console.log('result', results[0]);

  //     if (status.toString() == 'OK') {
  //       map.setCenter(results[0].geometry.location);
  //       map.setZoom(15);
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         position: results[0].geometry.location
  //       });
  //     } else {
  //       console.error('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });


  // }

  // processGeocodeResults(results, status) {

  // }



