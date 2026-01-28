import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVisitaComponent } from './perfil-visita.component';

describe('PerfilVisitaComponent', () => {
  let component: PerfilVisitaComponent;
  let fixture: ComponentFixture<PerfilVisitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilVisitaComponent]
    });
    fixture = TestBed.createComponent(PerfilVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
