import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSvStudentDatatableComponent } from './academic-sv-student-datatable.component';

describe('AcademicSvStudentDatatableComponent', () => {
  let component: AcademicSvStudentDatatableComponent;
  let fixture: ComponentFixture<AcademicSvStudentDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSvStudentDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSvStudentDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
