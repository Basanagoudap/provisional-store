import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-login/customer-signup/customer-signup.component'
import { MainScreenComponent } from './main-screen/main-screen.component';
import { OwnerDashboardComponent } from './owner-login/owner-dashboard/owner-dashboard.component';
import { CustHomeComponent } from './customer/cust-home/cust-home.component';
import { CustProfileComponent } from './customer/cust-profile/cust-profile.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { CompletedOrdersComponent } from './owner/completed-orders/completed-orders.component';
import { PendingOrdersComponent } from './owner/pending-orders/pending-orders.component';
import { OwnerProfileComponent } from './owner/owner-profile/owner-profile.component';
import { AllOrdersComponent } from './owner/all-orders/all-orders.component';

const routes: Routes = [
  {
    path: '', component: MainScreenComponent
  },
  {path:'main-screen', component:MainScreenComponent},
  {
    path:'owner-login', component:OwnerLoginComponent
  },
  {
    path:'customer-login', component:CustomerLoginComponent
  },
  {
    path:'customer-signup', component:CustomerSignupComponent
  },
  {
    path:'customer-home', component:CustHomeComponent
  },
  {
    path:'customer-profile', component:CustProfileComponent
  },
  {
    path:'owner-dashboard', component:OwnerDashboardComponent
  },
  {
    path:'completed-orders', component:CompletedOrdersComponent
  },
  {
    path:'pending-orders', component:PendingOrdersComponent
  },
  {
    path:'all-orders', component:AllOrdersComponent
  },
  {
    path:'owner-profile', component:OwnerProfileComponent
  },
  {
    path:'404-not-found', component:NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404-not-found'
  },
];

@NgModule({     
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
