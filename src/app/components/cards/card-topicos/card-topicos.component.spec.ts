import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTopicosComponent } from './card-topicos.component';

describe('CardTopicosComponent', () => {
  let component: CardTopicosComponent;
  let fixture: ComponentFixture<CardTopicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTopicosComponent]
    });
    fixture = TestBed.createComponent(CardTopicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
