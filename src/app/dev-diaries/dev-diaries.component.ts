import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IDevDiary } from './data/dev-diaries.model';
import { getImageUrl } from '../shared/utilities/image-utils';

@Component({
  selector: 'mr-dev-diaries',
  standalone: false,
  templateUrl: './dev-diaries.component.html',
  styleUrl: './dev-diaries.component.scss'
})
export class DevDiariesComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();
  devDiaries: IDevDiary[] = [];
  getImageUrl = getImageUrl;
  searchDiaryTitle: string = '';
  selectedDiary: any = null;
  selectedCategory = 'all';
  filteredDiaries: any[] = [];
  isDiariesUpdated: boolean = false;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) => {
      this.devDiaries = results["resolvedData"].dev_diaries;
      this.loadDevDiaries();
    })
  }


  loadDevDiaries() {
    // Your existing load logic
    this.filteredDiaries = this.devDiaries;
  }

  getRecentCount(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.devDiaries.filter(diary =>
      new Date(diary.date) > oneMonthAgo
    ).length;
  }

  getCategoryCount(): number {
    const categories = new Set(this.devDiaries.map(diary => diary.category));
    return categories.size;
  }

  getCategoryClass(category: string): string {
    return 'category-' + (category?.toLowerCase() || 'unknown');
  }

  getSafeCategory(category: string): string {
    return category || 'Unknown';
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredDiaries = this.devDiaries;
    } else {
      this.filteredDiaries = this.devDiaries.filter(diary =>
        diary.category === category
      );
    }
  }

  selectDiary(diary: any) {
    this.selectedDiary = diary;
  }
  getDefaultImage(): string {
    return 'assets/default-diary-icon.svg';
  }

  getLatestUpdate(): string {
    if (!this.devDiaries || this.devDiaries.length === 0) return 'N/A';
    // Assuming your diaries have a date property
    const latest = this.devDiaries.reduce((prev, current) =>
      new Date(prev.date) > new Date(current.date) ? prev : current
    );
    return this.formatDate(latest.date);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  isRecentUpdate(date: string): boolean {
    const diaryDate = new Date(date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return diaryDate > weekAgo;
  }

  getStatusText(date: string): string {
    return this.isRecentUpdate(date) ? 'Recent' : 'Older';
  }

  onSearchDiary() {
    // Implement your search logic here
    console.log('Searching for:', this.searchDiaryTitle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}