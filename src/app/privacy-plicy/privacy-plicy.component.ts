import { Component, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy-plicy',
  templateUrl: './privacy-plicy.component.html',
  styleUrls: ['./privacy-plicy.component.css']
})
export class PrivacyPlicyComponent {
  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }


  type: any
  sections: any[] = [];

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type')
    this.fetchSections();

  }

  fetchSections() {
    this.apiService.getStaticPages().subscribe((data: any[]) => {
      this.sections = data;
      console.log(data);

    });
  }

  scrollToSection(slug: string) {
    const sectionElement = this.elementRef.nativeElement.querySelector(`#${this.generateValidId(slug)}`);

    if (sectionElement) {
      const containerElement = this.elementRef.nativeElement.querySelector('.right-part');

      if (containerElement) {
        const containerTop = containerElement.getBoundingClientRect().top;
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const offset = sectionTop - containerTop - 20; // Adjust the offset if needed
        containerElement.scrollBy({ top: offset, behavior: 'smooth' });
      }
    }
  }



  generateValidId(slug: string): string {
    // Remove non-alphanumeric characters and replace with underscores
    return 'section_' + slug.replace(/[^a-zA-Z0-9]/g, '_');
  }



}
