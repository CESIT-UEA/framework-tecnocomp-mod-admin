import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusModulosComponent } from './meus-modulos.component';

describe('MeusModulosComponent', () => {
  let component: MeusModulosComponent;
  let fixture: ComponentFixture<MeusModulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusModulosComponent]
    });
    fixture = TestBed.createComponent(MeusModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
