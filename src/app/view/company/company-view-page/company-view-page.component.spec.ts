import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewPageComponent } from './company-view-page.component';

describe('CompanyViewPageComponent', () => {
  let component: CompanyViewPageComponent;
  let fixture: ComponentFixture<CompanyViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
