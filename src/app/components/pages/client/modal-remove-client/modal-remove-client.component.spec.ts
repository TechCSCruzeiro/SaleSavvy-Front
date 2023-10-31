import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveClientComponent } from './modal-remove-client.component';

describe('ModalRemoveClientComponent', () => {
  let component: ModalRemoveClientComponent;
  let fixture: ComponentFixture<ModalRemoveClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRemoveClientComponent]
    });
    fixture = TestBed.createComponent(ModalRemoveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
