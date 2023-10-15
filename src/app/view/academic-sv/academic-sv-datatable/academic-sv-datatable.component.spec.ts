import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSvDatatableComponent } from './academic-sv-datatable.component';

describe('AcademicSvDatatableComponent', () => {
  let component: AcademicSvDatatableComponent;
  let fixture: ComponentFixture<AcademicSvDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSvDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSvDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
