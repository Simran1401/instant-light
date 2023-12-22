import { Component, ElementRef } from '@angular/core';
import { ApiService } from '../services/apiServices/api.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery = '';
  searchResults: any[] = [];
  apiUrl = 'https://il.gftpl.in';
  searchResultsVisible: boolean = false;
  options: AnimationOptions = {
    path: '/assets/searchanimation.json',
  };

  constructor(private apiService: ApiService) { }

  onSearchInputChange() {
    if (this.searchQuery.length >= 3) {
      this.apiService.searchProducts(this.searchQuery).subscribe((results: any[]) => {
        this.searchResults = results;
        this.searchResultsVisible = true;
      });
    } else {
      this.searchResults = [];
      this.searchResultsVisible = false;
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }  

}
