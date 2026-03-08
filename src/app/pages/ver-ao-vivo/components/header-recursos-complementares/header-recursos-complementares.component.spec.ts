import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRecursosComplementaresComponent } from './header-recursos-complementares.component';

describe('HeaderRecursosComplementaresComponent', () => {
  let component: HeaderRecursosComplementaresComponent;
  let fixture: ComponentFixture<HeaderRecursosComplementaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderRecursosComplementaresComponent]
    });
    fixture = TestBed.createComponent(HeaderRecursosComplementaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
