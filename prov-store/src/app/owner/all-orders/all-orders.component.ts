import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
import { ProductImageRendererComponent } from '../product-image-renderer/product-image-renderer.component';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  rowData;
  colDefs;
  public rowHeight = 50;

  constructor(private router: Router, private appService: AppServicesService) {
    this.colDefs = [
      { field: 'name' },
      { field: 'image', cellRendererFramework: ProductImageRendererComponent },
      { field: 'price' },
      { field: 'quantity' },
      { field: 'buyerName' },
      { field: 'purchaseDateStr' },
      { field: 'deliveryDateStr' },
      { field: 'address', wrapText: true },
      { field: 'number' },
      { field: 'status' },
    ];
  }

  ngOnInit(): void {
    if (!localStorage.getItem('ownerLoggedIn')) {
      this.router.navigate(['/owner-login']);
    }
    this.getAllOrders();
  }

  async getAllOrders() {
    try {
      this.rowData = await this.appService
        .getAllOrders()
        .toPromise();

        this.rowData.forEach(element => {
          element.purchaseDateStr = new Date(element.purchaseDate*1000);
          element.deliveryDateStr = new Date(element.deliveryDate*1000);
        });
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
  }

  logoutOwner() {
    localStorage.removeItem('ownerLoggedIn');
    this.router.navigate(['/owner-login']);
  }
}
