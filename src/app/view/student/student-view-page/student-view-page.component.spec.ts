import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewPageComponent } from './student-view-page.component';

describe('StudentViewPageComponent', () => {
  let component: StudentViewPageComponent;
  let fixture: ComponentFixture<StudentViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
