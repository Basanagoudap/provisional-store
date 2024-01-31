import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AppServicesService } from '../services/app-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {
  ownerLoginForm;
  ownerData;

  constructor(private formBuilder: FormBuilder, private appService: AppServicesService, private router: Router) { 
    this.ownerLoginForm =  this.formBuilder.group({
      Email: ["", Validators.compose([Validators.required])],
      Password: ["", Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('ownerLoggedIn')){
      this.router.navigate(['/owner-dashboard']);  
    }
  }

  async getOwnerDataByEmail(email){
    try {
      return await this.appService.getOwnerByEmail(email).toPromise();
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
  }

  async ownerLoginMethod(owner: any){
    try {
      this.ownerData = await this.getOwnerDataByEmail(owner.Email);
    } catch (error) {
      console.error(error);
    }
    if(this.ownerData){
      if(owner.Password == this.ownerData.password){
        console.log('SUCCESS');
        localStorage.setItem('ownerLoggedIn', "true")                   //!
        this.router.navigate(['/owner-dashboard']);  
      }else{
        console.error("invalid password");
      }
    }else {
      console.error('Email not registered');
    }
  }

}
