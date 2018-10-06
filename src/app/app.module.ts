import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {ToolbarComponent} from './core/layout/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {IconsModule} from './icon.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoanComponent } from './loan/loan.component';
import {AuthGuard} from './core/auth/auth.guard';
import { LoanCreateComponent } from './loan/create/loan.create.component';
import {NgxCurrencyModule} from 'ngx-currency';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoanComponent,
    LoanCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    IconsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCurrencyModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
