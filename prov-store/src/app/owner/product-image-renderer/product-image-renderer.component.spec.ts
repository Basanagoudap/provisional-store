import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageRendererComponent } from './product-image-renderer.component';

describe('ProductImageRendererComponent', () => {
  let component: ProductImageRendererComponent;
  let fixture: ComponentFixture<ProductImageRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
