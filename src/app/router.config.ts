import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { driversRouterConfig } from './drivers/drivers.route.config'
import { operatorsRouterConfig } from './operators/operators.route.config'

export const routerConfig : Route[] = [
    { path: '', component: DashboardComponent },
    { path: 'home', component: DashboardComponent },
    ...driversRouterConfig,
    ...operatorsRouterConfig
];

