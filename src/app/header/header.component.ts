import { Component, Renderer2 } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/apiServices/api.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent {
	isMenuCollapsed = true;
	closeResult = '';
	productCategory!: any[]
	contactInfo: any;

	constructor(
		private renderer: Renderer2,
		private offcanvasService: NgbOffcanvas, private apiService: ApiService
	) { }

	ngOnInit() {

		const javaScriptForHead = this.renderer.createElement('script');
		javaScriptForHead.src = `../../assets/js/header.js`;
		this.renderer.appendChild(document.head, javaScriptForHead);

		this.fetchProductCategoryHome();
		this.fetchContactInfo();
	}

	open(content: any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === OffcanvasDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on the backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	fetchProductCategoryHome() {
		this.apiService.getProductCategoryHome().subscribe(
			(data: any[]) => {
				console.log("product category", data);
				this.productCategory = data;
			});
	}

	fetchContactInfo() {
		this.apiService.getContactInfo().subscribe(
			(data) => {
				console.log("Contact Info", data);
				this.contactInfo = data;
			});
	}
}
