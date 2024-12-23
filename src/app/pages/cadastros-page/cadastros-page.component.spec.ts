import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosPageComponent } from './cadastros-page.component';

describe('CadastrosPageComponent', () => {
  let component: CadastrosPageComponent;
  let fixture: ComponentFixture<CadastrosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrosPageComponent]
    });
    fixture = TestBed.createComponent(CadastrosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
