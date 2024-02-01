import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cust-home',
  templateUrl: './cust-home.component.html',
  styleUrls: ['./cust-home.component.css'],
})
export class CustHomeComponent implements OnInit {
  allProds: any;
  cartForm;
  disabled: any;
  minusdisabled: any;

  constructor(
    private router: Router,
    private appService: AppServicesService,
    private formBuilder: FormBuilder
  ) {
    this.cartForm = this.formBuilder.group({
      cart: [1],
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('loggedIn')) {
      this.router.navigate(['/customer-login']);
    } else if (
      localStorage.getItem('loggedIn') != undefined &&
      localStorage.getItem('loggedIn') !== null
    ) {
      this.appService.getAllProducts().subscribe((product) => {
        this.allProds = product;
      });
    }
  }

  addToCart() {
    console.log('hiii');
  }

  increment(val) {
    if (val == 'plus') {
      let add = this.cartForm.controls['cart'].value;
      this.cartForm.controls['cart'].setValue(add + 1);
      let totalAdd = this.cartForm.controls['cart'].value;
      console.log(totalAdd, 'totalAdd');

      if (totalAdd > 4|| totalAdd==0) {
        this.disabled = true;
      } else if(totalAdd > 1) {
        this.disabled = false;
      }
    } else {
      let minus = this.cartForm.controls['cart'].value;
      this.cartForm.controls['cart'].setValue(minus - 1);
      let totalMinus=this.cartForm.controls['cart'].value;
      if (totalMinus>5||totalMinus==0) {
        this.minusdisabled = true;
      } else if(totalMinus>1) {
        this.minusdisabled = false;
      }
    }
  }

  logoutCust() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/customer-login']);
  }
}
