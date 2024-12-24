import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsUsuariosComponent } from './cards-usuarios.component';

describe('CardsUsuariosComponent', () => {
  let component: CardsUsuariosComponent;
  let fixture: ComponentFixture<CardsUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsUsuariosComponent]
    });
    fixture = TestBed.createComponent(CardsUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
