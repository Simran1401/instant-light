import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/apiServices/api.service';

@Component({
  selector: 'app-home-section-five',
  templateUrl: './home-section-five.component.html',
  styleUrls: ['./home-section-five.component.css']
})
export class HomeSectionFiveComponent {
  
  bestSellingProducts: any[] = [];
  apiUrl = 'https://il.gftpl.in'
  testimonialsData!: any[];

  constructor(private elementRef: ElementRef, private fb: FormBuilder,private toastr:ToastrService,  private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBestSellingProducts().subscribe(data => {
      this.bestSellingProducts = data;
      console.log("bestSellingProducts",data);
      
    });
    this.fetchTestimonials();
  }

  fetchTestimonials() {
    this.apiService.getTestimonials().subscribe(
      (data: any[]) => {
        console.log("Testimonials", data);
        this.testimonialsData = data;
      });
  }

  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rewind: true,
    dotsEach: true,
    dots:true,
    // autoplay: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,

      }
    }
  }

}
