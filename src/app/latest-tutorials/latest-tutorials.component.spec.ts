import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTutorialsComponent } from './latest-tutorials.component';

describe('LatestTutorialsComponent', () => {
  let component: LatestTutorialsComponent;
  let fixture: ComponentFixture<LatestTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTutorialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
