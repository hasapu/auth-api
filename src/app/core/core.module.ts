import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconsModule }    from '../icon.module';
import { MaterialModule } from '../material.module';

import { LoginComponent }     from './auth/login/login.component';
import { RegisterComponent }  from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports     : [
    CommonModule,
    MaterialModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CoreModule {}
