import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerLoginComponent,
    MainScreenComponent,
    CustomerLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
