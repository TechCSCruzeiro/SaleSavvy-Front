import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesSuccessComponent } from './messages-success.component';

describe('MessagesSuccessComponent', () => {
  let component: MessagesSuccessComponent;
  let fixture: ComponentFixture<MessagesSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesSuccessComponent]
    });
    fixture = TestBed.createComponent(MessagesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
