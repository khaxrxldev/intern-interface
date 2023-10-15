import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDatatableComponent } from './student-datatable.component';

describe('StudentDatatableComponent', () => {
  let component: StudentDatatableComponent;
  let fixture: ComponentFixture<StudentDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
