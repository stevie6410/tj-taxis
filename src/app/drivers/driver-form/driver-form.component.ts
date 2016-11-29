import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() initialValue: any;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes);
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
      //console.log(this.form.patchValue(changes['initialValue'].currentValue));
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
