import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../services/apiServices/api.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-mobile-search',
  templateUrl: './mobile-search.component.html',
  styleUrls: ['./mobile-search.component.css']
})
export class MobileSearchComponent {


  searchQuery = '';
  searchResults: any[] = [];
  apiUrl = 'https://il.gftpl.in';
  searchResultsVisible: boolean = false;
  options: AnimationOptions = {
    path: '/assets/searchanimation.json',
  };

  constructor(private apiService: ApiService,private location: Location,) { }

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

  backLocation() {
    this.location.back();
  }

  clearSearch() {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }  

}
