import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvaluationDatatableComponent } from './student-evaluation-datatable.component';

describe('StudentEvaluationDatatableComponent', () => {
  let component: StudentEvaluationDatatableComponent;
  let fixture: ComponentFixture<StudentEvaluationDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEvaluationDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEvaluationDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
