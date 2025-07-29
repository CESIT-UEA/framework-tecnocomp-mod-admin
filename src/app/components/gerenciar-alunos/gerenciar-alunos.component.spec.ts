import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAlunosComponent } from './gerenciar-alunos.component';

describe('GerenciarAlunosComponent', () => {
  let component: GerenciarAlunosComponent;
  let fixture: ComponentFixture<GerenciarAlunosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarAlunosComponent]
    });
    fixture = TestBed.createComponent(GerenciarAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
