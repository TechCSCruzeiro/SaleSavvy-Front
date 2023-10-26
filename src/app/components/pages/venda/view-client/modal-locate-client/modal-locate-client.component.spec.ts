import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocateClientComponent } from './modal-locate-client.component';

describe('ModalLocateClientComponent', () => {
  let component: ModalLocateClientComponent;
  let fixture: ComponentFixture<ModalLocateClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLocateClientComponent]
    });
    fixture = TestBed.createComponent(ModalLocateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
