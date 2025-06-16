import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarAlunoComponent } from './dialog-editar-aluno.component';

describe('DialogEditarAlunoComponent', () => {
  let component: DialogEditarAlunoComponent;
  let fixture: ComponentFixture<DialogEditarAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditarAlunoComponent]
    });
    fixture = TestBed.createComponent(DialogEditarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
