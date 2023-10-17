import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterListPageComponent } from './semester-list-page.component';

describe('SemesterListPageComponent', () => {
  let component: SemesterListPageComponent;
  let fixture: ComponentFixture<SemesterListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
