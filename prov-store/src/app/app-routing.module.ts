import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

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
  }
];

@NgModule({     
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
