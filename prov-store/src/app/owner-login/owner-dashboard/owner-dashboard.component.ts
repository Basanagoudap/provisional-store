import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from '../../services/app-services.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css'],
})
export class OwnerDashboardComponent implements OnInit {
  addProductsForm;
  editProductsForm;
  allProducts;
  addNewProductModalId = '#addProductsModal';
  editProductModalId = '#editProductModal';
  deleteProductModalId = '#deleteProductModal';
  deleteProductList;
  productId = "";

  constructor(
    private router: Router,
    private appService: AppServicesService,
    private formBuilder: FormBuilder
  ) {
    this.addProductsForm = this.formBuilder.group({
      Name: ['', Validators.compose([Validators.required])],
      Description: ['', Validators.compose([Validators.required])],
      Image: ['', Validators.compose([Validators.required])],
      Price: ['', Validators.compose([Validators.required])],
      Quantity: ['', Validators.compose([Validators.required])],
    });
    this.editProductsForm = this.formBuilder.group({
      Name: ['', Validators.compose([Validators.required])],
      Description: ['', Validators.compose([Validators.required])],
      Price: ['', Validators.compose([Validators.required])],
      Quantity: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('ownerLoggedIn')) {
      this.router.navigate(['/owner-login']);
    }
    this.getAllProducts();
  }

  async getAllProducts() {
    try {
      this.allProducts = await this.appService.getAllProducts().toPromise();
    } catch (error) {
      console.error('Error fetching customer data:', error);
      throw error;
    }
  }

  addNewProducts(addProduct) {
    let newProduct = {
      name: addProduct.Name,
      image: addProduct.Image,
      price: addProduct.Price,
      description: addProduct.Description,
      quantity: addProduct.Quantity,
    };
    this.appService.addNewProduct(newProduct).subscribe((data) => {
      if (data) {
        $(this.addNewProductModalId).modal('hide');
        $('.modal').css('overflow-y', 'auto');
        $('.modal-backdrop').remove();
        this.resetAddForm();
        this.getAllProducts();
      }
    });
  }
  
  logoutOwner() {
    localStorage.removeItem('ownerLoggedIn');
    this.router.navigate(['/owner-login']);
  }

  addImage(event) {
    let file = event.target.files[0];
    let renderer = new FileReader();
    renderer.readAsDataURL(file);
    renderer.onload = (event) => {
      this.addProductsForm.controls['Image'].setValue(event.target?.result);
    };
  }
  resetAddForm() {
    this.addProductsForm.reset();
  } 

  resetEditForm() {
    this.editProductsForm.reset();
  }

  selectDeleteProduct(product) {
    this.deleteProductList = product;
  }
  deleteProduct() {
    this.appService.deleteProducById(this.deleteProductList._id).subscribe({
      next: (data) => {
        $(this.deleteProductModalId).modal('hide');
        $('.modal').css('overflow-y', 'auto');
        $('.modal-backdrop').remove();
        this.getAllProducts();
      },
      error: (error) => {
        console.error(error.message, 'There was an error!', error);
      },
    });
  }

  editProductModal(editProduct){
    this.productId = editProduct._id;
    this.editProductsForm.controls['Name'].setValue(editProduct.name);
    this.editProductsForm.controls['Description'].setValue(editProduct.description);
    this.editProductsForm.controls['Quantity'].setValue(editProduct.quantity);
    this.editProductsForm.controls['Price'].setValue(editProduct.price);
  }

  updateProduct(product){
    let updateProduct = {
      name: product.Name,
      price: product.Price,
      description: product.Description,
      quantity: product.Quantity,
    }
    if(this.productId.length != 0){
      console.log(this.productId, 'final product', product);
      this.appService.updateProduct(this.productId, updateProduct).subscribe((data) => {
        if (data) {
          $(this.editProductModalId).modal('hide');
          $('.modal').css('overflow-y', 'auto');
          $('.modal-backdrop').remove();
          this.resetEditForm();
          this.getAllProducts();
        }
      });
    }
    
  }
} 
