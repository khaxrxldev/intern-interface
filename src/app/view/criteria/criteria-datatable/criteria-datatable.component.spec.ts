import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaDatatableComponent } from './criteria-datatable.component';

describe('CriteriaDatatableComponent', () => {
  let component: CriteriaDatatableComponent;
  let fixture: ComponentFixture<CriteriaDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
