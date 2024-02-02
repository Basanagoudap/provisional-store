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
  allProducts: any;
  cartLength = 0;
  cartForm;
  plusDisabled: boolean = false;
  minusDisabled: boolean = false;

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
      this.getCartLength()
      this.appService.getAllProducts().subscribe((product) => {
        this.allProducts = product;
      });
    }
  }

  getCartLength(){
    try {
      this.appService.getCustomerCartLength(localStorage.getItem('custEmail')).subscribe((data: any) => {
        
        this.cartLength = data        
      })
      
    } catch (error) {
      console.error('Error fetching customer cart data:', error);
      throw error;
    }
  }

  increment(val) {
    let cartValue = this.cartForm.controls['cart'].value;
    if (val == 'plus') {
      if (cartValue == 5) {
        this.plusDisabled = true;
        this.minusDisabled = false;
      } else if (cartValue < 5) {
        this.plusDisabled = false;
        this.minusDisabled = false;
        this.cartForm.controls['cart'].setValue(cartValue + 1);
      }
    } else if (val == 'minus') {
      if (cartValue == 1) {
        this.plusDisabled = false;
        this.minusDisabled = true;
      } else if (cartValue > 1) {
        this.plusDisabled = false;
        this.minusDisabled = false;
        this.cartForm.controls['cart'].setValue(cartValue - 1);
      }
    }
  }

  addToCart(product) {
    const productToAdd = {
      productId: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      finalPrice: product.price,
      totalQuantity: '1',
      actualPrice: product.price,
    };
    this.appService
      .getCustomerByEmail(localStorage.getItem('custEmail'))
      .subscribe((data: any) => {
        if (data) {
          let flag = false;
          let cart = data.cart;
          cart.forEach((cart) => {
            if (productToAdd.productId == cart.productId) {
              flag = true;
            }
          });
          if (!flag) {
            cart.push(productToAdd);
            let body = {
              cart: cart,
            };
            this.appService
              .updateCustomerCart(data._id, body)
              .subscribe((added: any) => {
                if (added) {
                  this.router.navigate(['/customer-cart']);
                }
              });
          } else {
            this.router.navigate(['/customer-cart']);
          }
        }
      });
  }

  logoutCust() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('custEmail');
    localStorage.removeItem('custId');
    this.router.navigate(['/customer-login']);
  }
}
