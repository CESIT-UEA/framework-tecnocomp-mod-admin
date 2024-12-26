import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTopicoComponent } from './cadastro-topico.component';

describe('CadastroTopicoComponent', () => {
  let component: CadastroTopicoComponent;
  let fixture: ComponentFixture<CadastroTopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroTopicoComponent]
    });
    fixture = TestBed.createComponent(CadastroTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
