import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from '../../services/app-services.service'

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {

  allProducts;

  constructor(private router: Router, private appService: AppServicesService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('ownerLoggedIn')){
      this.router.navigate(['/owner-login']);  
    }
    this.getAllProducts()
  }

  async getAllProducts(){
    try {
      this.allProducts = await this.appService.getAllProducts().toPromise();
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
    console.log(this.allProducts);
    
  }

  logoutOwner(){
    localStorage.removeItem('ownerLoggedIn')
    this.router.navigate(['/owner-login']);  
    
  }

}
