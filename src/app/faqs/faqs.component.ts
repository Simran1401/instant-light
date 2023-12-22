import { Component, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {

  active = 1;
  panels = ['What types of lighting products do you offer?', 'What are the benefits of using LED lights?', 'Are your lighting products energy-efficient?', 'What is the warranty period for your lighting products?', 'Can I dim the lights I purchase from your website?'];
  bannerData: any;
  apiUrl = 'https://il.gftpl.in';
  loading: boolean = false;

  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef, private apiService: ApiService) { }


  ngOnInit() {
    this.loading = true;
    this.getBanner();
    this.apiService.getFaqCategories().subscribe(categories => {
      this.faqCategories = categories;
      console.log("categories", categories);

      if (this.faqCategories.length > 0) {
        this.loadFaqs(this.faqCategories[0].slug);
      }
    });
  }


  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getBanner() {
    this.apiService.getFaqBanner().subscribe(res => {
      console.log("faq banner", res);
      this.bannerData = res;
    })
  }

  faqCategories: any[] = [];
  selectedCategory: string | null = null;
  selectedCategoryFaqs: any

  loadFaqs(categorySlug: string) {
    this.selectedCategory = categorySlug;
    console.log(categorySlug);

    this.apiService.getFaqsForCategory(categorySlug).subscribe(faqs => {
      this.selectedCategoryFaqs = faqs;
      console.log(faqs);
      console.log("FAQ", this.selectedCategoryFaqs["FAQ Detail"]);
      this.loading = false // Load FAQs for the first category initially


    });
  }


}
