import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class GMapsService {

    getLocationFromAddress(address: string): Observable<google.maps.GeocoderResult> {
        let s = new Subject<google.maps.GeocoderResult>();
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status.toString() == 'OK') {
                console.log(results[0]);
                s.next(results[0]);
                s.complete();
            } else {
                s.error(status);
            }
        });
        return s.asObservable();
    }

    placeSearch(initalLocation: google.maps.LatLng, raidus: number, address: string, map: google.maps.Map): Observable<google.maps.places.PlaceResult[]> {
        let s = new Subject<google.maps.places.PlaceResult[]>();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
            query: address,
            location: initalLocation,
            radius: raidus
        }, function (results: google.maps.places.PlaceResult[], status) {
            if (status = google.maps.places.PlacesServiceStatus.OK) {
                s.next(results);
                s.complete();
            } else {
                s.error(status);
            }
        });
        return s.asObservable();
    }

    setMarker(map: google.maps.Map, markerLocation: google.maps.LatLng, label: string): google.maps.Marker {
        var marker = new google.maps.Marker({
            map: map,
            position: markerLocation,
            label: label,
            animation: google.maps.Animation.DROP
        });
        return marker;
    }

    clearMapMarkers(map: google.maps.Map){
        
    }

}