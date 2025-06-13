import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarEquipeComponent } from './dialog-criar-equipe.component';

describe('DialogCriarEquipeComponent', () => {
  let component: DialogCriarEquipeComponent;
  let fixture: ComponentFixture<DialogCriarEquipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCriarEquipeComponent]
    });
    fixture = TestBed.createComponent(DialogCriarEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
