import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySvViewPageComponent } from './industry-sv-view-page.component';

describe('IndustrySvViewPageComponent', () => {
  let component: IndustrySvViewPageComponent;
  let fixture: ComponentFixture<IndustrySvViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySvViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySvViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
