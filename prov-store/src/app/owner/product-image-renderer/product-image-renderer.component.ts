import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image-renderer',
  templateUrl: './product-image-renderer.component.html',
  styleUrls: ['./product-image-renderer.component.css']
})
export class ProductImageRendererComponent implements OnInit {
  params: any;

  constructor() { }

  ngOnInit(): void {
  }
  agInit(params: any){
    this.params = params; 
  } 

}
