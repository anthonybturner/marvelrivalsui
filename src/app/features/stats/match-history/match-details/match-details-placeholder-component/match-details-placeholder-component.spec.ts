import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsPlaceholderComponent } from './match-details-placeholder-component';

describe('MatchDetailsPlaceholderComponent', () => {
  let component: MatchDetailsPlaceholderComponent;
  let fixture: ComponentFixture<MatchDetailsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchDetailsPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchDetailsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
