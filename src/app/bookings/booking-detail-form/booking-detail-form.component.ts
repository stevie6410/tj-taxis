import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Booking } from '../../shared/model/booking';

@Component({
  selector: 'app-booking-detail-form',
  templateUrl: './booking-detail-form.component.html',
  styleUrls: ['./booking-detail-form.component.css']
})
export class BookingDetailFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() booking: Booking;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      pickupAddress: ['', Validators.required],
      destAddress: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['booking'].currentValue) {
      this.form.patchValue(changes['booking'].currentValue);
    }
  }

  ngOnInit() {
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].errors && this.form.controls[field].errors[error];
  }

  reset() {
    this.form.reset();
  }

  get isValid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }
}
