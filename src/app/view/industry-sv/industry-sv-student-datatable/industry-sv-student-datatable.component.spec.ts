import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySvStudentDatatableComponent } from './industry-sv-student-datatable.component';

describe('IndustrySvStudentDatatableComponent', () => {
  let component: IndustrySvStudentDatatableComponent;
  let fixture: ComponentFixture<IndustrySvStudentDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySvStudentDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySvStudentDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
