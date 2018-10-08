import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { LoginComponent }     from './auth/login/login.component';
import { RegisterComponent }  from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path       : 'dashboard',
    component  : DashboardComponent,
    canActivate: [AuthGuard]
  }
];

export const CoreRouting: ModuleWithProviders = RouterModule.forRoot(routes);
