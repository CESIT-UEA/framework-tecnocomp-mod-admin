import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCadastroComponent } from './cards-cadastro.component';

describe('CardsCadastroComponent', () => {
  let component: CardsCadastroComponent;
  let fixture: ComponentFixture<CardsCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsCadastroComponent]
    });
    fixture = TestBed.createComponent(CardsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
