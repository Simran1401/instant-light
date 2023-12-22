import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
	selector: 'app-blog-details',
	templateUrl: './blog-details.component.html',
	styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {

	blogs: any[] = [];
	blogtags: any[] = [];
	popularPosts: any[] = [];
	trendingPosts: any[] = [];
	selectedBlog: any = {}; 
	loading:boolean=false;
	apiUrl = 'https://il.gftpl.in';
	searchQuery = '';
	searchResults: any[] = [];
	options: AnimationOptions = {
		path: '/assets/searchanimation.json',
	  };

	constructor(private scrollToService: ScrollToService,private route: ActivatedRoute, private elementRef: ElementRef, private apiService: ApiService) { }


	ngOnInit() {
		this.loading=true;
		this.fetchBlogTags();
		this.fetchBlogs();
		const slug = this.route.snapshot.params['slug'];
        
        this.apiService.getBlogs().subscribe((blogs: any[]) => {
            this.selectedBlog = blogs.find(blog => blog.slug === slug);
			console.log(this.selectedBlog);
            this.popularPosts = blogs.filter(blog => blog.is_popular_post);
            this.trendingPosts = blogs.filter(blog => blog.is_trending_post);
			this.loading=false
        });
	}

	images = [
		'../../assets/imgs/1681461848bulbs.jpg',
		'../../assets/imgs/Hero_SecImg.png',
		'../../assets/imgs/newled.jpg',
		'../../assets/imgs/image90.png',
		'../../assets/imgs/HVAC-DISPLAY.jpg',
	];

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true })
	carousel!: NgbCarousel;

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

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

	fetchBlogs() {
		this.apiService.getBlogs().subscribe((data: any[]) => {
			this.blogs = data;
			console.log("blogs", data);
		});
	}

	fetchBlogTags() {
		this.apiService.getBlogTags().subscribe((data: any[]) => {
			this.blogtags = data;
			console.log("blog tags", data);
		});
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
