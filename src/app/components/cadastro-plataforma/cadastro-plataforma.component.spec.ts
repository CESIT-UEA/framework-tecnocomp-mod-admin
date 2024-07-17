import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPlataformaComponent } from './cadastro-plataforma.component';

describe('CadastroPlataformaComponent', () => {
  let component: CadastroPlataformaComponent;
  let fixture: ComponentFixture<CadastroPlataformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroPlataformaComponent]
    });
    fixture = TestBed.createComponent(CadastroPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
