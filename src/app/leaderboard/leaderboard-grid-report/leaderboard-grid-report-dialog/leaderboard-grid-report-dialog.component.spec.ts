import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardGridReportDialogComponent } from './leaderboard-grid-report-dialog.component';


describe('LeaderboardGridReportDialogComponent', () => {
  let component: LeaderboardGridReportDialogComponent;
  let fixture: ComponentFixture<LeaderboardGridReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardGridReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardGridReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
