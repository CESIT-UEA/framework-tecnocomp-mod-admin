import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarMembroComponent } from './dialog-criar-membro.component';

describe('DialogCriarMembroComponent', () => {
  let component: DialogCriarMembroComponent;
  let fixture: ComponentFixture<DialogCriarMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCriarMembroComponent]
    });
    fixture = TestBed.createComponent(DialogCriarMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
