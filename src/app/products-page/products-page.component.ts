import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apiServices/api.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  isProductsVisible = true;
  constructor(private route: ActivatedRoute, private elementRef: ElementRef, private apiService: ApiService) { }
  subcategories: any;
  productSubcategory: any[] = [];
  id: any;
  apiUrl = 'https://il.gftpl.in'
  loading: boolean = true;
  productCategory!: any[]
  subcategoryGroups: any[] = [];
  currentSubcategoryGroup: any;
  selectedCategory: any

  options: AnimationOptions = {
    path: '/assets/searchanimation.json',
  };
  subcategoryId: any
  ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.subcategoryId = this.route.snapshot.paramMap.get('subcategory');

    // this.apiService.getProductCategoryHome().subscribe((res:any)=>{

    //  res.map((mapRes:any)=>{
    //   console.log(mapRes);
    //   if (this.id==mapRes.id){
    //     this.selectedCategory=mapRes
    //     console.log(this.selectedCategory);
    //   }
    //  })
    // })
    this.fetchSubcategory(this.id);
    this.fetchProductCategoryHome();

    if(this.subcategoryId){
      this.fetchSubcategoryWiseProd(this.subcategoryId)
    }
  }
  toggleProductsVisibility(): void {
    this.isProductsVisible = !this.isProductsVisible;
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  backToSubCat() {
    this.isProductsVisible = true;
  }

  selectedSubcategoryGroup: any;
  fetchSubcategory(categoryId: number) {
    this.apiService.getSubCategoryGroupWiseSubcategory(categoryId).subscribe(
      (data: any) => {
        const subcategoryData = data; // Extract subcategory data
        this.subcategories = subcategoryData; // Assign to subcategories property
        console.log('Subcategory:', this.subcategories);
        this.loading = false
        console.log(this.subcategories.subcategory_group_subcategory);
        this.subcategories.map((res: any) => {
          console.log(res);
          res.subcategory_group_subcategory.map((mapRes: any) => {
            console.log(mapRes);
            if (this.id == mapRes.id) {
              this.selectedCategory = mapRes
              this.selectedSubcategoryGroup = mapRes;
              console.log(this.selectedCategory);
              this.fetchSubcategoryGroups(this.selectedCategory.category.id);
            }
          })
        })

      },
      error => {
        console.error('Error fetching subcategory groups:', error);
      }
    );
  }

  fetchSubcategoryWiseProd(subcategoryId: number) {
    this.apiService.getSubCategoryWiseProduct(subcategoryId).subscribe(
      (data: any[]) => {
        this.productSubcategory = data;
        console.log('Products:', this.productSubcategory);
        this.isProductsVisible = !this.isProductsVisible; // Show products
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }



  fetchProductCategoryHome() {
    this.apiService.getProductCategoryHome().subscribe(
      (data: any[]) => {
        console.log("product category", data);
        this.productCategory = data;
      },
      error => {
        console.error('Error fetching product category:', error);
      }
    );
  }

  fetchSubcategoryGroups(categoryId: number) {
    this.subcategoryGroups = []
    this.apiService.getCategoryWiseSubcategoryGroups(categoryId).subscribe(
      (data: any) => {
        this.subcategoryGroups = data.data;
        console.log('Subcategory Groups:', data);
        this.loading = false
      },
      error => {
        console.error('Error fetching subcategory groups:', error);
      }
    );
  }

}
