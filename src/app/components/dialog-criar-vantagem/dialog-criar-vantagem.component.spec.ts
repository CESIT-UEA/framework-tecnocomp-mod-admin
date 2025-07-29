import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarVantagemComponent } from './dialog-criar-vantagem.component';

describe('DialogCriarVantagemComponent', () => {
  let component: DialogCriarVantagemComponent;
  let fixture: ComponentFixture<DialogCriarVantagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCriarVantagemComponent]
    });
    fixture = TestBed.createComponent(DialogCriarVantagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
