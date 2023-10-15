import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySupervisorDatatableComponent } from './company-supervisor-datatable.component';

describe('CompanySupervisorDatatableComponent', () => {
  let component: CompanySupervisorDatatableComponent;
  let fixture: ComponentFixture<CompanySupervisorDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySupervisorDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySupervisorDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
