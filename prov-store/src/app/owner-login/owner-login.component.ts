import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {
  ownerLoginForm;

  constructor(private formBuilder: FormBuilder) { 
    this.ownerLoginForm =  this.formBuilder.group({
      Email: ["", Validators.compose([Validators.required])],
      Password: ["", Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  ownerLoginMethod(owner: any){
    console.log(owner);
    
  }

}
