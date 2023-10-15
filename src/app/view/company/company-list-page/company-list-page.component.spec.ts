import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListPageComponent } from './company-list-page.component';

describe('CompanyListPageComponent', () => {
  let component: CompanyListPageComponent;
  let fixture: ComponentFixture<CompanyListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
