import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'mr-search-bar',
  imports: [MatLabel],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent {

  searchTerm: string = '';
  heroName: any;

    onSearch() {
      if (!this.searchTerm) return;

  }
}
