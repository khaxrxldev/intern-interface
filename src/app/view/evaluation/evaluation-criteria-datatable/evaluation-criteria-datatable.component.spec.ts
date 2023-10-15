import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCriteriaDatatableComponent } from './evaluation-criteria-datatable.component';

describe('EvaluationCriteriaDatatableComponent', () => {
  let component: EvaluationCriteriaDatatableComponent;
  let fixture: ComponentFixture<EvaluationCriteriaDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationCriteriaDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationCriteriaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
