import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {
  customerSignupForm

  constructor(private formBuilder: FormBuilder) { 
    this.customerSignupForm = this.formBuilder.group({
      Email: ["", Validators.compose([Validators.required])],
      Password: ["", Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  customerSignupMethod(signup){
    console.log(signup);
    
  }
}
