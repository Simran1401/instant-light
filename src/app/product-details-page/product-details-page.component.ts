import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product-details-page',
	templateUrl: './product-details-page.component.html',
	styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent {
	active = 1;
	apiUrl = 'https://il.gftpl.in';
	productDetails: any; 
	id: any;
	additionalImages: string[] = [];
	productFeatures: any[] = []; 
	myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
	myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

	constructor(private scrollToService: ScrollToService,  private route: ActivatedRoute, private apiService: ApiService, private elementRef: ElementRef, private modalService: NgbModal) { }

	closeResult!: string;
	ProudPartnersdata!: any;
	loading:boolean=false

	ngOnInit() {
		this.loading=true
		this.fetchProudPartners();
		this.id = this.route.snapshot.paramMap.get('id')
		this.fetchProductDetails(this.id)
	}

	images = [
		'../../assets/imgs/image80.svg',
		'../../assets/imgs/image81.svg',
		'../../assets/imgs/image82.svg',
		'../../assets/imgs/image83.svg',
		'../../assets/imgs/image84.svg',
	];

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true })
	carousel!: NgbCarousel;

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
	activeImage: string = ''; // Store the active image URL

	openVerticallyCentered(content: TemplateRef<any>, img: string) {
		this.activeImage = img; // Update the activeImage variable with the selected image URL
		this.modalService.open(content, { centered: true, size: 'lg' });
	}

	fetchProudPartners() {
		this.apiService.getProudPartners().subscribe(
			(data: any[]) => {
				console.log("Proud Partners", data);
				this.ProudPartnersdata = data;
			});
	}

	fetchProductDetails(productId: number){
		this.apiService.getProductDetails(productId)
			.subscribe(
				(response: any) => {
					this.productDetails = response;
					console.log("product details",response);
					this.additionalImages = [
						response.image,
						response.image1,
						response.image2,
						response.image3,
						response.image4
					].filter(imageUrl => !!imageUrl);
					this.productFeatures = response.product_feature_product;
					this.loading=false
					// Handle any additional logic or data transformation here
				},
				error => {
					console.error('Error fetching product details:', error);
				}
			);
	}

}
