import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadearComponent } from './headear.component';

describe('HeadearComponent', () => {
  let component: HeadearComponent;
  let fixture: ComponentFixture<HeadearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadearComponent]
    });
    fixture = TestBed.createComponent(HeadearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
