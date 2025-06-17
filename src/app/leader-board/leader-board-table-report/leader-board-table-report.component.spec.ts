import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardTableReportComponent } from './leader-board-table-report.component';

describe('LeaderBoardGridlistComponent', () => {
  let component: LeaderBoardTableReportComponent;
  let fixture: ComponentFixture<LeaderBoardTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardTableReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
