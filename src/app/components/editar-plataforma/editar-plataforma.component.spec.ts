import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlataformaComponent } from './editar-plataforma.component';

describe('EditarPlataformaComponent', () => {
  let component: EditarPlataformaComponent;
  let fixture: ComponentFixture<EditarPlataformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPlataformaComponent]
    });
    fixture = TestBed.createComponent(EditarPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
