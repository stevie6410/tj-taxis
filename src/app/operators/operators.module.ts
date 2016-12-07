import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { OperatorsComponent } from './operators.component';
import { OperatorFormComponent } from './operator-form/operator-form.component';
import { OperatorService } from '../shared/service/operator.service';
import { OperatorAddComponent } from './operator-add/operator-add.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    OperatorService
  ],
  declarations: [
    OperatorsComponent,
    OperatorFormComponent,
    OperatorAddComponent
  ],
  exports: [
    OperatorsComponent
  ]
})
export class OperatorsModule { }

export const operatorsRouterConfig: Route[] = [
    {
        path: 'operators', component: OperatorsComponent, children: [
            { path: 'add', component: OperatorAddComponent },
            { path: 'edit', component: OperatorAddComponent }
        ]
    }
];


