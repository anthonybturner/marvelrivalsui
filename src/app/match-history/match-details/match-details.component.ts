import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatchDetails } from '../data/models/match-details.model';
import { MatchDetailsService } from '../services/match-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-match-details',
  standalone: false,
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.scss'
})
export class MatchDetailsComponent implements OnInit, OnDestroy {

  match_details?: IMatchDetails; // Replace with the actual type for match details
  errorLoading: boolean = false;
  errorMessage: string = '';
  private sub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private matchDetailsService: MatchDetailsService) { }
  
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit() {
    // Initialize matchId or any other logic needed when the component is initialized
    this.sub = this.route.paramMap.subscribe(params => {
      const matchUid = params.get('match_uid') || '';
      if (matchUid) {
        this.loadMatchDetails(matchUid);
      }
    });
  }

  loadMatchDetails(matchUid: string) {
    this.matchDetailsService.getMatchDetails(matchUid).subscribe({
      next: (response) => { this.match_details = response.match_details; },
      error: (error) => { this.errorLoading = true; this.errorMessage = error.message; }
    });
  }


  onBack() {
    // Implement navigation logic to go back to the previous page
    this.router.navigate(['/match-history'], { relativeTo: this.route });
  }
}