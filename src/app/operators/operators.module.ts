import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';


import { OperatorsComponent } from './operators.component';
import { OperatorFormComponent } from './operator-form/operator-form.component';
import { OperatorService } from '../shared/service/operator.service';
import { OperatorAddComponent } from './operator-add/operator-add.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
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
