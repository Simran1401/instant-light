import { Component, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/apiServices/api.service';

@Component({
  selector: 'app-home-section-seven',
  templateUrl: './home-section-seven.component.html',
  styleUrls: ['./home-section-seven.component.css']
})
export class HomeSectionSevenComponent {

  testimonialsData!: any[];
  apiUrl = 'https://il.gftpl.in'

  constructor(
    private renderer: Renderer2,
    private el: ElementRef, private apiService: ApiService) { }

  rotatory = [];
  ngOnInit() {
    this.fetchTestimonials();
  }

  ngAfterViewInit() {
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
    margin: 10,
    center: true,
    nav: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rewind: true,
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
        items: 3,

      }
    }
  }


  // slideConfig = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   dots: true,
  //   prevArrow: false,
  //   nextArrow: false,
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 4,
  //       }
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 1,
  //         slideToScroll: 1
  //       }
  //     }
  //   ]
  // };

}
