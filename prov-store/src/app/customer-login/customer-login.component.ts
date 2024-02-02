import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  customerLoginForm;
  customerData;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppServicesService,
    private router: Router,
  ) {
    this.customerLoginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('loggedIn')){
      this.router.navigate(['/customer-home']); 
    }
  }

  async getDataByEmail(email) {
    try {
      return await this.appService.getCustomerByEmail(email).toPromise();
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
  }
  
  async customerLoginMethod(customer) {
    try {
      this.customerData = await this.getDataByEmail(customer.Email);
    } catch (error) {
      console.error(error);
    }
    if(this.customerData){
      if(customer.Password == this.customerData.password){
        console.log('SUCCESS');
        localStorage.setItem('custEmail', customer.Email);
        localStorage.setItem('custId', this.customerData._id);
        localStorage.setItem('loggedIn', "true")
        this.router.navigate(['/customer-home']);  
      }else{
        console.error("invalid password");
      }
    }else {
      console.error('Email not registered');
    }
  }
}
