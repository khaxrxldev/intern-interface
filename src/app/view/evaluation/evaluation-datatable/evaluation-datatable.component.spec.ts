import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDatatableComponent } from './evaluation-datatable.component';

describe('EvaluationDatatableComponent', () => {
  let component: EvaluationDatatableComponent;
  let fixture: ComponentFixture<EvaluationDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
