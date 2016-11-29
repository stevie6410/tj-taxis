import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/do';

import { DriverService } from '../shared/service/driver.service';
import { Driver } from '../shared/model/driver';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: Driver[];
  newDriver: Driver;

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.newDriver = new Driver();
    this.driverService.allDrivers()
      .do(console.log)
      .subscribe(
      drivers => { this.drivers = drivers },
      err => { console.log("Got an error:", err); }
      );
  }

  addDriver() {
    this.driverService.addDriver(this.newDriver);
    this.newDriver = new Driver();
  }

  deleteDriver(driver: Driver) {
    this.driverService.deleteDriver(driver);
  }

  updateDriver(driverId: string, driver: Driver) {
    console.log(driverId);
    console.log(driver);
    this.driverService.saveDriver(driverId, driver);
  }

}
