import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsClonarFichaComponent } from './cards-clonar-ficha.component';

describe('CardsClonarFichaComponent', () => {
  let component: CardsClonarFichaComponent;
  let fixture: ComponentFixture<CardsClonarFichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsClonarFichaComponent]
    });
    fixture = TestBed.createComponent(CardsClonarFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
