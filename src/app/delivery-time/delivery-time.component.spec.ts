import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTimeComponent } from './delivery-time.component';

describe('DeliveryTimeComponent', () => {
  let component: DeliveryTimeComponent;
  let fixture: ComponentFixture<DeliveryTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ DeliveryTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
