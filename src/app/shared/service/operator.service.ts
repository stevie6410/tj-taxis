import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseRef } from 'angularfire2';

import { Operator } from '../model/operator';

@Injectable()
export class OperatorService {

  fbDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb,
    private http: Http) {
    this.fbDb = fb.database().ref();
  }

  allOperators(): Observable<Operator[]> {
    return this.db.list('operators');
  }

  addOperator(operator: Operator): any {
    this.db.list('operators').push(operator);
  }

  deleteOperator(operator: Operator): any {
    this.db.list('operators').remove(operator.$key);
  }

  saveOperator(operatorId: string, operator: Operator): any {
    let operatorToSave = Object.assign({}, operator);
    delete (operatorToSave.$key);

    const operatorDbPath: string = 'operators/' + operatorId;
    let dataToSave = {};
    dataToSave[operatorDbPath] = operatorToSave;

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
