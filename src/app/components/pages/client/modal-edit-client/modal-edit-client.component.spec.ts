import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditClientComponent } from './modal-edit-client.component';

describe('ModalEditClientComponent', () => {
  let component: ModalEditClientComponent;
  let fixture: ComponentFixture<ModalEditClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditClientComponent]
    });
    fixture = TestBed.createComponent(ModalEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
