import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cust-home',
  templateUrl: './cust-home.component.html',
  styleUrls: ['./cust-home.component.css']
})
export class CustHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loggedIn')){
      this.router.navigate(['/customer-login']); 
    }
  }

  logoutCust(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/customer-login']); 
  }

}
