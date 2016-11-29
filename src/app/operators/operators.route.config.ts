import { Route } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { OperatorAddComponent } from './operator-add/operator-add.component';

export const operatorsRouterConfig: Route[] = [
    {
        path: 'operators', component: OperatorsComponent, children: [
            { path: '', component: OperatorsComponent },
            { path: 'add', component: OperatorAddComponent },
            { path: 'edit', component: OperatorAddComponent }
        ]
    }
];

