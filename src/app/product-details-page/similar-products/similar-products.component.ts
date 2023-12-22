import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/apiServices/api.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent {
  apiUrl = 'https://il.gftpl.in'
  productDetails: any;
  id: any;
  productSubcategory: any;
  subcatId: any;
  constructor(private route: ActivatedRoute, private elementRef: ElementRef, private apiService: ApiService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.fetchProductDetails(this.id)
    
  }

  // fetchSubcategoryWiseProd(subcategoryId: number) {
  //   this.apiService.getSubCategoryWiseProduct(subcategoryId).subscribe(
  //     (data: any[]) => {
  //       this.productSubcategory = data;
  //       console.log('Products:', this.productSubcategory);
  //       for(const products of this.productSubcategory){

  //         if(subcategoryId===products.subcategory.id){
  //           console.log(products.subcategory.id);
            
  //         }
  //       }
        
  //     },
  //     error => {
  //       console.error('Error fetching products:', error);
  //     }
  //   );
  // }

  fetchSubcategoryWiseProd(subcategoryId: number) {
    this.apiService.getSubCategoryWiseProduct(subcategoryId).subscribe(
      (data: any[]) => {
        console.log('All Products:', data);
  
        // Filter out products with a matching subcategory.id
        this.productSubcategory = data.filter(product => product.id !== this.id);
        console.log(this.id);
        for(const products of this.productSubcategory){
          console.log(products.id);
        }
          
        console.log('Filtered Products:', this.productSubcategory);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  fetchProductDetails(productId: number) {
    this.apiService.getProductDetails(productId)
      .subscribe(
        (response: any) => {
          this.productDetails = response;
          console.log("product details", response);
          console.log("subcatid",this.productDetails.subcategory.id);
          this.subcatId= this.productDetails.subcategory.id;
          this.fetchSubcategoryWiseProd(this.subcatId)
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
  }

}
