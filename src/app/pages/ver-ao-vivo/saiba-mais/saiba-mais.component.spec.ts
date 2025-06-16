import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaibaMaisComponent } from './saiba-mais.component';

describe('SaibaMaisComponent', () => {
  let component: SaibaMaisComponent;
  let fixture: ComponentFixture<SaibaMaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaibaMaisComponent]
    });
    fixture = TestBed.createComponent(SaibaMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
