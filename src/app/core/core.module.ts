import {NgModule} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {MaterialModule} from '../material.module';
import {IconsModule} from '../icon.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    MaterialModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class CoreModule {}
