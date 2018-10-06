import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreRouting} from './core/core.routing';
import {LoanComponent} from './loan/loan.component';
import {AuthGuard} from './core/auth/auth.guard';
import {LoanCreateComponent} from './loan/create/loan.create.component';

const routes: Routes = [
  { path: 'loan',
    component: LoanComponent,
    canActivate: [AuthGuard]
  },
  { path: 'loan/create',
    component: LoanCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreRouting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
