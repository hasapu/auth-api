import {NgModule} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {MaterialModule} from '../material.module';
import {IconsModule} from '../icon.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';


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
  ],
  providers: [AuthGuard]
})

export class CoreModule {}
