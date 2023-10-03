import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveProductComponent } from './modal-remove-product.component';

describe('ModalRemoveProductComponent', () => {
  let component: ModalRemoveProductComponent;
  let fixture: ComponentFixture<ModalRemoveProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRemoveProductComponent]
    });
    fixture = TestBed.createComponent(ModalRemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
