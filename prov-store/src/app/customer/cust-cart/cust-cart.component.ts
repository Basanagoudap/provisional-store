import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
// import * as _ from 'lodash';

@Component({
  selector: 'app-cust-cart',
  templateUrl: './cust-cart.component.html',
  styleUrls: ['./cust-cart.component.css']
})
export class CustCartComponent implements OnInit {
  noCart: boolean = true;
  cartChanged: boolean = true;
  custData:any =  {};
  cartData: any = [];
  cartDataCopy;
  totalPrice = 0;

  constructor(private router: Router, private appService: AppServicesService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('loggedIn')) {
      this.router.navigate(['/customer-login']);
    } 
    this.getCustomerByEmail(localStorage.getItem('custEmail'))
  }

   getCustomerByEmail(email) {
    try {
      this.totalPrice=0;
      this.appService.getCustomerByEmail(email).subscribe((data: any) => {
        this.cartDataCopy = JSON.parse(JSON.stringify(data.cart));
        this.cartData =  JSON.parse(JSON.stringify(data.cart));
        // this.cartDataCopy = _.cloneDeep(data.cart);
        // this.cartData =  _.cloneDeep(data.cart);
        
        if(this.cartData.length == 0){
          this.noCart = false
        }
        this.cartData.forEach(element => {
          this.totalPrice = this.totalPrice + parseInt(element.finalPrice)
        });
      
      })
      
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
  }

  cartIncrement(cart, val){
    if(val == 'plus'){
      if(cart.totalQuantity != 5 || cart.totalQuantity != '5'){
        this.cartChanged = false;
        cart.totalQuantity = (parseInt(cart.totalQuantity)+1).toString();
        cart.finalPrice = (parseInt(cart.finalPrice)+parseInt(cart.actualPrice)).toString();
        this.totalPrice = this.totalPrice+ parseInt(cart.actualPrice);
        this.viewUpdateBtn()
      }
    }else{
      if(cart.totalQuantity != 1 || cart.totalQuantity != '1'){
        this.cartChanged = false;
        cart.totalQuantity = (parseInt(cart.totalQuantity)-1).toString();
        cart.finalPrice = (parseInt(cart.finalPrice)-parseInt(cart.actualPrice)).toString();
        this.totalPrice = this.totalPrice- parseInt(cart.actualPrice);
        this.viewUpdateBtn()
      }
    }
  }

  viewUpdateBtn(){
    if(JSON.stringify(this.cartData) == JSON.stringify(this.cartDataCopy)){
      this.cartChanged = true;
    }else{
      this.cartChanged = false;
    }
  }

  updateSingleCart(){
    let body = {
      cart: this.cartData
    }
    this.appService.updateCustomerCart(localStorage.getItem('custId'), body).subscribe((data) => {
      if(data){
        this.cartChanged = true;
        console.log("CART UPDATED");
        this.getCustomerByEmail(localStorage.getItem('custEmail'))
      }
    })
  }

  removeCart(cartId, price){
    let index;
    for (let i = 0; i < this.cartData.length; i++) {
      if(cartId == this.cartData[i]){
        index = i;
      }
    }
    if (index !== -1) {
      this.cartData.splice(index, 1);
      this.totalPrice = this.totalPrice- parseInt(price)
      let body = {
        cart: this.cartData
      }
      
      this.appService.updateCustomerCart(localStorage.getItem('custId'), body).subscribe((data) => {
        if(data){
          console.log("CART UPDATED");
          this.getCustomerByEmail(localStorage.getItem('custEmail'))
        }
      })
    }
    if(this.cartData.length == 0){
      this.noCart = false;
    }else {
      this.noCart = true;
    }
  }

  logoutCust(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('custEmail');
    localStorage.removeItem('custId');
    this.router.navigate(['/customer-login']);
  }

}
