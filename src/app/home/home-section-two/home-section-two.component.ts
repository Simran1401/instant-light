import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/apiServices/api.service';

@Component({
  selector: 'app-home-section-two',
  templateUrl: './home-section-two.component.html',
  styleUrls: ['./home-section-two.component.css']
})
export class HomeSectionTwoComponent {

  shopByCategoryData: any;
  productCategory!:any[]
  apiUrl = 'https://il.gftpl.in'
  
  constructor(private apiService: ApiService) { }

  ngOnInit(){    
    this.fetchShopByCategory();
    this.fetchProductCategoryHome();
  }
  
  fetchShopByCategory() {
    this.apiService.getShopByCategory().subscribe(res => {
      console.log("shop by category", res);
      this.shopByCategoryData = res;
    });
  }

  fetchProductCategoryHome() {
    this.apiService.getProductCategoryHome().subscribe(
      (data: any[]) => {
        console.log("product category", data);
        this.productCategory = data;
      });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dotsEach: true,
    dots:true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1.4
      },
      400:{
        items:2.3
      },
      600: {
        items: 2.5
      },
      1000: {
        items: 2.5
      }
    },
    nav: true
  }
}

