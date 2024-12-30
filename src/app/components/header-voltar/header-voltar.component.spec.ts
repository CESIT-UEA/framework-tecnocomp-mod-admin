import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVoltarComponent } from './header-voltar.component';

describe('HeaderVoltarComponent', () => {
  let component: HeaderVoltarComponent;
  let fixture: ComponentFixture<HeaderVoltarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderVoltarComponent]
    });
    fixture = TestBed.createComponent(HeaderVoltarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
