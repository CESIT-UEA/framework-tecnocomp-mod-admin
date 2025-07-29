import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoAutoCadastroComponent } from './confirmacao-auto-cadastro.component';

describe('ConfirmacaoAutoCadastroComponent', () => {
  let component: ConfirmacaoAutoCadastroComponent;
  let fixture: ComponentFixture<ConfirmacaoAutoCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacaoAutoCadastroComponent]
    });
    fixture = TestBed.createComponent(ConfirmacaoAutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
