import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPerfilPageComponent } from './meu-perfil-page.component';

describe('MeuPerfilPageComponent', () => {
  let component: MeuPerfilPageComponent;
  let fixture: ComponentFixture<MeuPerfilPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeuPerfilPageComponent]
    });
    fixture = TestBed.createComponent(MeuPerfilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
