import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { OwnerDashboardComponent } from './owner-login/owner-dashboard/owner-dashboard.component';
import { CustomerSignupComponent } from './customer-login/customer-signup/customer-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerLoginComponent,
    MainScreenComponent,
    CustomerLoginComponent,
    OwnerDashboardComponent,
    CustomerSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
