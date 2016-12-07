import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Route } from '@angular/router';

import { DriversComponent } from './drivers.component';
import { DriverService } from '../shared/service/driver.service';
import { DriverFormComponent } from './driver-form/driver-form.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        DriverService,
        FormBuilder
    ],
    declarations: [
        DriversComponent,
        DriverFormComponent
    ],
    exports: [
        DriversComponent,
        DriverFormComponent
    ]
})
export class DriversModule {

}

export const driversRouterConfig : Route[] = [
    { path: 'drivers', component: DriversComponent }
];