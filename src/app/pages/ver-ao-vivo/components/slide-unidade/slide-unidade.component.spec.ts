import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideUnidadeComponent } from './slide-unidade.component';

describe('SlideUnidadeComponent', () => {
  let component: SlideUnidadeComponent;
  let fixture: ComponentFixture<SlideUnidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideUnidadeComponent]
    });
    fixture = TestBed.createComponent(SlideUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
