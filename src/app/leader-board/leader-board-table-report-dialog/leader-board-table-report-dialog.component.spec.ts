import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderBoardTableReportDialogComponent } from './leader-board-table-report-dialog.component';


describe('HeroBoardGridlistDialogComponent', () => {
  let component: LeaderBoardTableReportDialogComponent;
  let fixture: ComponentFixture<LeaderBoardTableReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardTableReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardTableReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
