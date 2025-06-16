import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFichaComponent } from './footer-ficha.component';

describe('FooterFichaComponent', () => {
  let component: FooterFichaComponent;
  let fixture: ComponentFixture<FooterFichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterFichaComponent]
    });
    fixture = TestBed.createComponent(FooterFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
