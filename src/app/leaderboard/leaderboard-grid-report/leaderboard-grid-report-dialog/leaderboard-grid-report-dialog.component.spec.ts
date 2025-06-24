import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderBoardGridReportDialogComponent } from './leaderboard-grid-report-dialog.component';


describe('LeaderBoardGridReportDialogComponent', () => {
  let component: LeaderBoardGridReportDialogComponent;
  let fixture: ComponentFixture<LeaderBoardGridReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardGridReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBoardGridReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
