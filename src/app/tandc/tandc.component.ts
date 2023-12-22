import { Component, ElementRef } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';

@Component({
  selector: 'app-tandc',
  templateUrl: './tandc.component.html',
  styleUrls: ['./tandc.component.css']
})
export class TandcComponent {
  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef, private apiService: ApiService) { }

  section: any[] = [];

  ngOnInit() {
    this.fetchTermsAndConditions();
  }

  triggerScrollTo(id: string) {
    const sectionElement = this.elementRef.nativeElement.querySelector(`#${id}`);
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

  fetchTermsAndConditions() {
    this.apiService.getTermsAndConditions().subscribe(res => {
      this.section.push(res); // Push the fetched section to the array
      console.log("terms and conditions", res);
    });
  }
}
