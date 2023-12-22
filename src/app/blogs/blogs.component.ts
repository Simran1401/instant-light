import { Component, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

  bannerData: any;
  apiUrl = 'https://il.gftpl.in';
  blogs: any[] = [];
  blogtags: any[] = [];
  popularPosts: any[] = [];
  trendingPosts: any[] = [];
  selectedTag: string | null = null;
  filteredBlogs: any[] = [];
  loading: boolean = false;
  options: AnimationOptions = {
    path: '/assets/searchanimation.json',
  };
  searchQuery = '';
  searchResults: any[] = [];

  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef, private apiService: ApiService) { }

  // Add a new property to control the visibility of search results
  searchResultsVisible: boolean = false;

  // ...

  onSearchInputChange() {
    if (this.searchQuery.length) {
      this.apiService.searchBlogs(this.searchQuery).subscribe((results: any[]) => {
        this.searchResults = results;
        this.searchResultsVisible = true; // Set visibility to true when search results are available
      });
    } else {
      this.searchResults = [];
      this.searchResultsVisible = false; // Set visibility to false when search query is empty
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }  
  
  ngOnInit() {
    this.loading = true;
    this.getBanner();
    this.fetchBlogs();
    this.apiService.getBlogs().subscribe((blogs: any[]) => {
      this.popularPosts = blogs.filter(blog => blog.is_popular_post);
      this.trendingPosts = blogs.filter(blog => blog.is_trending_post);
    });
    this.fetchBlogTags();
  }

  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getBanner() {
    this.apiService.getBlogBanner().subscribe(res => {
      console.log("blog banner", res);
      this.bannerData = res;
    })
  }

  fetchBlogs() {
    this.apiService.getBlogs().subscribe((data: any[]) => {
      this.blogs = data;
      this.filteredBlogs = data;
      this.loading = false;
      console.log("blogs", data);
    });
  }

  fetchBlogTags() {
    this.apiService.getBlogTags().subscribe((data: any[]) => {
      this.blogtags = data;
      console.log("blog tags", data);
    });
  }

  filterBlogsByTag(tagTitle: any) {
    this.selectedTag = tagTitle;
    if (tagTitle === null) {
      this.filteredBlogs = this.blogs;
    } else {
      this.filteredBlogs = this.blogs.filter(blog => blog.tags.some((tag: any) => tag.title === tagTitle));
    }
  }

  searchBlogs() {
    if (this.searchQuery.length) {
      this.apiService.searchBlogs(this.searchQuery).subscribe((results: any[]) => {
        this.searchResults = results;
        console.log(results);

      });
    } else {
      this.searchResults = [];
    }
  }

}
