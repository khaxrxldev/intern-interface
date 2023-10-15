import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListDatatableComponent } from './application-list-datatable.component';

describe('ApplicationListDatatableComponent', () => {
  let component: ApplicationListDatatableComponent;
  let fixture: ComponentFixture<ApplicationListDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
