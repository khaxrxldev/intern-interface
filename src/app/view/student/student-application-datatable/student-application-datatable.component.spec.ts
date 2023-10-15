import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationDatatableComponent } from './student-application-datatable.component';

describe('StudentApplicationDatatableComponent', () => {
  let component: StudentApplicationDatatableComponent;
  let fixture: ComponentFixture<StudentApplicationDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentApplicationDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
