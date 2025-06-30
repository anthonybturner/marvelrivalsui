import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatchDetails } from '../data/models/match-details.model';
import { MatchDetailsService } from '../services/match-details.service';

@Component({
  selector: 'mr-match-details',
  standalone: false,
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.scss'
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  matchUid: string | null = null;
  match_details!: IMatchDetails; // Replace with the actual type for match details
  constructor(private route: ActivatedRoute, private matchDetailsService: MatchDetailsService) {
    // You can inject ActivatedRoute to get the matchId from the route parameters
    // this.matchId = this.route.snapshot.paramMap.get('matchId');
  } 
  ngOnDestroy(): void {
    
  }
  ngOnInit() {
    // Initialize matchId or any other logic needed when the component is initialized
    this.matchUid = this.route.snapshot.paramMap.get('match_uid');
    this.matchDetailsService.getMatchDetails(this.matchUid!)
      .subscribe({
        next: (response) => {
          this.match_details = response.match_details;
        },
        error: (error) => {
          console.error('Error fetching match details:', error);
        }
      });
  }
}
