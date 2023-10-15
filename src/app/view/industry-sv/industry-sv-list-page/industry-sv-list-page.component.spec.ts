import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySvListPageComponent } from './industry-sv-list-page.component';

describe('IndustrySvListPageComponent', () => {
  let component: IndustrySvListPageComponent;
  let fixture: ComponentFixture<IndustrySvListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySvListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySvListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
