import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterDatatableComponent } from './semester-datatable.component';

describe('SemesterDatatableComponent', () => {
  let component: SemesterDatatableComponent;
  let fixture: ComponentFixture<SemesterDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
