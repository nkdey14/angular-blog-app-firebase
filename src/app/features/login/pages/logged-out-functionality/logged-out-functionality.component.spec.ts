import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutFunctionalityComponent } from './logged-out-functionality.component';

describe('LoggedOutFunctionalityComponent', () => {
  let component: LoggedOutFunctionalityComponent;
  let fixture: ComponentFixture<LoggedOutFunctionalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedOutFunctionalityComponent]
    });
    fixture = TestBed.createComponent(LoggedOutFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
