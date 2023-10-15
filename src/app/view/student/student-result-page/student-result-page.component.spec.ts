import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultPageComponent } from './student-result-page.component';

describe('StudentResultPageComponent', () => {
  let component: StudentResultPageComponent;
  let fixture: ComponentFixture<StudentResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
