import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListPageComponent } from './application-list-page.component';

describe('ApplicationListPageComponent', () => {
  let component: ApplicationListPageComponent;
  let fixture: ComponentFixture<ApplicationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
