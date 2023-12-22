import { Component, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-electronic-supplies',
  templateUrl: './electronic-supplies.component.html',
  styleUrls: ['./electronic-supplies.component.css']
})
export class ElectronicSuppliesComponent {
  constructor(private scrollToService: ScrollToService, private route: ActivatedRoute, private elementRef: ElementRef, private apiService: ApiService) { }
  subcategoryGroups: any[] = [];
  catBanner:any;
  id: any;
  apiUrl = 'https://il.gftpl.in'
  loading: boolean = true;

  ngOnInit() {
    this.loading=true;
    this.id=this.route.snapshot.paramMap.get('id')
    this.fetchSubcategoryGroups(this.id);
  }

  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  fetchSubcategoryGroups(categoryId: number) {
    this.apiService.getCategoryWiseSubcategoryGroups(categoryId).subscribe(
      (data: any) => {
        this.subcategoryGroups = data.data; 
        this.catBanner=data.category_banner;
        console.log('Subcategory Groups:', this.subcategoryGroups);
        console.log('Banner:', this.catBanner);
        this.loading = false;
      },
      error => {
        console.error('Error fetching subcategory groups:', error);
      }
    );
  }

}
