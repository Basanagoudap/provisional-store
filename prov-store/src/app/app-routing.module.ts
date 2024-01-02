import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-login/customer-signup/customer-signup.component'
import { MainScreenComponent } from './main-screen/main-screen.component';
import { OwnerDashboardComponent } from './owner-login/owner-dashboard/owner-dashboard.component'

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
    path:'owner-dashboard', component:OwnerDashboardComponent
  }
];

@NgModule({     
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
