import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsModulosComponent } from './cards-modulos.component';

describe('CardsModulosComponent', () => {
  let component: CardsModulosComponent;
  let fixture: ComponentFixture<CardsModulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsModulosComponent]
    });
    fixture = TestBed.createComponent(CardsModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
