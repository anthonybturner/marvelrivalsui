import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardDetailsCardComponent } from './leader-board-details-card.component';

describe('LeaderBoardDetailsCardComponent', () => {
  let component: LeaderBoardDetailsCardComponent;
  let fixture: ComponentFixture<LeaderBoardDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
