import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/do';

import { OperatorService } from '../shared/service/operator.service';
import { Operator } from '../shared/model/operator';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  operators: Operator[];
  newOperator: Operator;

  constructor(private operatorService: OperatorService) { }

  ngOnInit() {
    this.newOperator = new Operator();
    this.operatorService.allOperators()
      .do(console.log)
      .subscribe(
      operators => { this.operators = operators },
      err => { console.log("Got an error:", err); }
      );
  }

  addOperator() {
    this.operatorService.addOperator(this.newOperator);
    this.newOperator = new Operator();
  }

  deleteOperator(operator: Operator) {
    this.operatorService.deleteOperator(operator);
  }

  updateOperator(operatorId: string, operator: Operator) {
    console.log(operatorId);
    console.log(operator);
    this.operatorService.saveOperator(operatorId, operator);
  }

}
