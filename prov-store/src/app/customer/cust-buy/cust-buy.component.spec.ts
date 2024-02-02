import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBuyComponent } from './cust-buy.component';

describe('CustBuyComponent', () => {
  let component: CustBuyComponent;
  let fixture: ComponentFixture<CustBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
