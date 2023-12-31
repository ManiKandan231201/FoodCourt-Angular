import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalfavoritesComponent } from './finalfavorites.component';

describe('FinalfavoritesComponent', () => {
  let component: FinalfavoritesComponent;
  let fixture: ComponentFixture<FinalfavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ FinalfavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalfavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
