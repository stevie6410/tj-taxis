import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseRef } from 'angularfire2';

import { Driver } from '../model/driver';

@Injectable()
export class BookingService {

  fbDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb,
    private http: Http) {
    this.fbDb = fb.database().ref();
  }

  allBookings(): Observable<Driver[]> {
    return this.db.list('drivers');
  }

  addDriver(newDriver: Driver): any {
    this.db.list('drivers').push(newDriver);
  }

  deleteDriver(driver: Driver): any {
    this.db.list('drivers').remove(driver.$key);
  }

  saveDriver(driverId: string, driver: Driver): any {
    //Create a new object from the driver
    let driverToSave = Object.assign({}, driver);
    //Delete the $key from driver to save
    delete (driverToSave.$key);

    const driverDbPath: string = 'drivers/' + driverId;
    console.log("Driver Db Path", driverDbPath);
    let dataToSave = {};
    dataToSave[driverDbPath] = driverToSave;

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
