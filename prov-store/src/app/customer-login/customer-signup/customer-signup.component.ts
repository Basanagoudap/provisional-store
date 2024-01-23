import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AppServicesService } from '../../services/app-services.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent implements OnInit {
  customerSignupForm;
  customerData;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppServicesService,
    private router: Router
  ) {
    this.customerSignupForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required])],
      RepeatPassword: ['', Validators.compose([Validators.required])],
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

  async customerSignupMethod(customer) {
    if (customer.Password == customer.RepeatPassword) {
      try {
        this.customerData = await this.getDataByEmail(customer.Email);
      } catch (error) {
        console.error(error);
      }
      if (!this.customerData) {
        let addCustomer = {
          email: customer.Email,
          password: customer.Password,
        };
        this.appService.addNewCustomer(addCustomer).subscribe((data) => {
          if (data) {
            console.log('Signup Succesfull');
            localStorage.setItem('loggedIn', "true")
            this.router.navigate(['/customer-home']);  
          }
        });
      } else {
        console.error('Email Already Registered');
      }
    } else {
      console.error('password dont match');
    }
  }
}
