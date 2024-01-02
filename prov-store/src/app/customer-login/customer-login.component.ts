import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  customerLoginForm

  constructor(private formBuilder: FormBuilder) { 
    this.customerLoginForm =  this.formBuilder.group({
      Email: ["", Validators.compose([Validators.required])],
      Password: ["", Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  customerLoginMethod(customer){
    console.log(customer);
    
  }

}
