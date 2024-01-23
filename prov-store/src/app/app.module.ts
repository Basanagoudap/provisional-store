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
import { CustHomeComponent } from './customer/cust-home/cust-home.component';
import { CustProfileComponent } from './customer/cust-profile/cust-profile.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { PendingOrdersComponent } from './owner/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './owner/completed-orders/completed-orders.component';
import { AllProductsComponent } from './owner/all-products/all-products.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerLoginComponent,
    MainScreenComponent,
    CustomerLoginComponent,
    OwnerDashboardComponent,
    CustomerSignupComponent,
    CustHomeComponent,
    CustProfileComponent,
    OwnerProfileComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent,
    AllProductsComponent
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
