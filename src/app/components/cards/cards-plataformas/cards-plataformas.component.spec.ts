import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPlataformasComponent } from './cards-plataformas.component';

describe('CardsPlataformasComponent', () => {
  let component: CardsPlataformasComponent;
  let fixture: ComponentFixture<CardsPlataformasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPlataformasComponent]
    });
    fixture = TestBed.createComponent(CardsPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
