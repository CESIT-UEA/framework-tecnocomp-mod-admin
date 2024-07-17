import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroModuloComponent } from './cadastro-modulo.component';

describe('CadastroModuloComponent', () => {
  let component: CadastroModuloComponent;
  let fixture: ComponentFixture<CadastroModuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroModuloComponent]
    });
    fixture = TestBed.createComponent(CadastroModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
