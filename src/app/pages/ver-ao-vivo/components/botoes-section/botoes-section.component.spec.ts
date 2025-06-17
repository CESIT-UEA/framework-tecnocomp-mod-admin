import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoesSectionComponent } from './botoes-section.component';

describe('BotoesSectionComponent', () => {
  let component: BotoesSectionComponent;
  let fixture: ComponentFixture<BotoesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotoesSectionComponent]
    });
    fixture = TestBed.createComponent(BotoesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
