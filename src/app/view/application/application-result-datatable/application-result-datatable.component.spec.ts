import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationResultDatatableComponent } from './application-result-datatable.component';

describe('ApplicationResultDatatableComponent', () => {
  let component: ApplicationResultDatatableComponent;
  let fixture: ComponentFixture<ApplicationResultDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationResultDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationResultDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
