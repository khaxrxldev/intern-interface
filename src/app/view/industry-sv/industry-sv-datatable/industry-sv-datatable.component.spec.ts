import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySvDatatableComponent } from './industry-sv-datatable.component';

describe('IndustrySvDatatableComponent', () => {
  let component: IndustrySvDatatableComponent;
  let fixture: ComponentFixture<IndustrySvDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySvDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySvDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
