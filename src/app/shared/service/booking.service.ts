import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseRef } from 'angularfire2';

import { Booking } from '../model/booking';

@Injectable()
export class BookingService {

  fbDb: any;
  fbEntityName: string = 'bookings';

  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb,
    private http: Http) {
    this.fbDb = fb.database().ref();
  }

  allBookings(): Observable<Booking[]> {
    return this.db.list(this.fbEntityName);
  }

  addBooking(booking: Booking): any {
    this.db.list(this.fbEntityName).push(booking);
  }

  deleteBooking(Booking: Booking): any {
    this.db.list(this.fbEntityName).remove(Booking.$key);
  }

  updateBooking(id: string, changes: any) {
    this.db.object(this.fbEntityName + '/' + id).update(changes);
  }

  saveBooking(BookingId: string, Booking: Booking): any {
    //Create a new object from the Booking
    let BookingToSave = Object.assign({}, Booking);
    //Delete the $key from Booking to save
    delete (BookingToSave.$key);

    const BookingDbPath: string = 'Bookings/' + BookingId;
    console.log("Booking Db Path", BookingDbPath);
    let dataToSave = {};
    dataToSave[BookingDbPath] = BookingToSave;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.fbDb.update(dataToSave)
      .then(
      val => {
        subject.next(val);
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      }
      );

    return subject.asObservable();
  }

}
