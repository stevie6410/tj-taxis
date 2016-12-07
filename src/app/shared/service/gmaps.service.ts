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

}