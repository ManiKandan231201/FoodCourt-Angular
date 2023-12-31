import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOffersComponent } from './pay-offers.component';

describe('PayOffersComponent', () => {
  let component: PayOffersComponent;
  let fixture: ComponentFixture<PayOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ PayOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
