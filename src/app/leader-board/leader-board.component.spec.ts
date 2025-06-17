import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardComponent } from './leader-board.component';
import { By } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';

describe('HeroBoardComponent', () => {
  let component: LeaderBoardComponent;
  let fixture: ComponentFixture<LeaderBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of heros when the component constructs', () => {
    const matSelect = fixture.debugElement.query(By.directive(MatSelect));
    
    expect(matSelect.children.length).toBeGreaterThan(0);
  });
});
