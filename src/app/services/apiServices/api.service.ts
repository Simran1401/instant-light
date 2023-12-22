import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  api = `${environment.api}`;

  getHomeBanner(): Observable<any> {
    const url = `${this.api}/home-banner/`;
    return this.httpClient.get(url);
  }

  getBlogBanner(): Observable<any> {
    const url = `${this.api}/blog-banner/`;
    return this.httpClient.get(url);
  }

  getAboutBanner(): Observable<any> {
    const url = `${this.api}/about-banner/`;
    return this.httpClient.get(url);
  }

  getCatalogsBanner(): Observable<any> {
    const url = `${this.api}/catalogs-banner/`;
    return this.httpClient.get(url);
  }

  getGetInTouchBanner(): Observable<any> {
    const url = `${this.api}/get-in-touch-banner/`;
    return this.httpClient.get(url);
  }

  getFaqBanner(): Observable<any> {
    const url = `${this.api}/faq-banner/`;
    return this.httpClient.get(url);
  }

  getShopByCategory(): Observable<any> {
    const url = `${this.api}/shop-by-category/`;
    return this.httpClient.get(url);
  }
  
  getQualityMatters(): Observable<any> {
    const url = `${this.api}/quality-matters-homepage/`;
    return this.httpClient.get(url);
  }
  
  getQualityMattersCards(): Observable<any[]> {
    const url = `${this.api}/quality-matters-cards/`;
    return this.httpClient.get<any[]>(url);
  }

  getOneStopShopData(): Observable<any> {
    const url = `${this.api}/one-stop-shop/`;
    return this.httpClient.get(url);
  }
  
  getTestimonials(): Observable<any[]> {
    const url = `${this.api}/testimonials/`;
    return this.httpClient.get<any[]>(url);
  }
  
  getFAQs(): Observable<any[]> {
    const url = `${this.api}/faq-home/`;
    return this.httpClient.get<any[]>(url);
  }
  
  getContactInfo(): Observable<any> {
    const url = `${this.api}/contacts/`;
    return this.httpClient.get(url);
  }
  
  getWhyChooseUs(): Observable<any> {
    const url = `${this.api}/why-choice-us/`;
    return this.httpClient.get(url);
  }  

  getQualityMattersAbout(): Observable<any> {
    const url = `${this.api}/quality-matters-about/`;
    return this.httpClient.get(url);
  }
  
  getSolutionAllLighting(): Observable<any> {
    const url = `${this.api}/solution-all-lighting/`;
    return this.httpClient.get(url);
  }  

  getOurAchievements(): Observable<any> {
    const url = `${this.api}/our-achievements/`;
    return this.httpClient.get(url);
  }

  getTeamMembers(): Observable<any> {
    const url = `${this.api}/our-teams/`;
    return this.httpClient.get(url);
  }

  getTermsAndConditions(): Observable<any> {
    const url = `${this.api}/terms-and-conditions/`;
    return this.httpClient.get(url);
  }

  getFaqCategories(): Observable<any[]> {
    const url = `${this.api}/faq-category/`;
    return this.httpClient.get<any[]>(url);
  }

  getFaqsForCategory(category: string): Observable<any[]> {
    const url = `${this.api}/faq/?faq_category=${category}`;
    return this.httpClient.get<any[]>(url);
  }
  
  getBlogs(): Observable<any[]> {
    const url = `${this.api}/blog/`; // Update the API URL as needed
    return this.httpClient.get<any[]>(url);
  }

  getBlogTags(): Observable<any[]> {
    const url = `${this.api}/blog-tag/`; // Update the API URL as needed
    return this.httpClient.get<any[]>(url);
  }

  getBlogBySlug(slug: string): Observable<any> {
    const url = `${this.api}/blog/?slug=${slug}`;
    return this.httpClient.get<any>(url);
  }

  getStaticPages(): Observable<any[]> {
    const url = `${this.api}/static-pages/`;
    return this.httpClient.get<any[]>(url);
  }

  getStaticPageDetails(slug: string): Observable<any> {
    const url = `${this.api}/static-detail/?slug=${slug}`;
    return this.httpClient.get<any>(url);
  }

  getProductCategoryHome() {
    const url = `${this.api}/product-category/`;
    return this.httpClient.get<any[]>(url);
  }

  searchBlogs(query: string): Observable<any[]> {
    const url = `${this.api}/search-blogs/?search=${query}`;
    return this.httpClient.get<any[]>(url);
  }

  searchProducts(query: string): Observable<any[]> {
    const url = `${this.api}/product-search/?search=${query}`;
    return this.httpClient.get<any[]>(url);
  }

  subscribeToNewsletter(email: any){
    const data = { email: email }; // Construct the request body
    return this.httpClient.post(`${this.api}/newsletter/`, data);
  }

  sendContactForm(data: any) {
    let url = this.api + '/contactus/';
    return this.httpClient.post(url, data)
  }

  getCategoryWiseSubcategoryGroups(categoryId: any){
      const url = `${this.api}/category-wise-subcategory-group/?category_id=${categoryId}`;
      return this.httpClient.get<any[]>(url);
  }

  getSubCategoryGroupWiseSubcategory(categoryId: any){
    const url = `${this.api}/subcategory-group-wise-subcategory/?subcategory_group_id=${categoryId}`;
    return this.httpClient.get<any[]>(url);
  }
  
  getSubCategoryWiseProduct(categoryId: any){
    const url = `${this.api}/subcategory-wise-product/?subcategory_id=${categoryId}`;
    return this.httpClient.get<any[]>(url);
  }
  
  getProudPartners(): Observable<any[]> {
    const url = `${this.api}/proud-partners/`; // Update the API URL as needed
    return this.httpClient.get<any[]>(url);
  }

  getProductDetails(productId: number) {
    const url = `${this.api}/product-details/?id=${productId}`;
    return this.httpClient.get(url);
  }

  getBestSellingProducts(): Observable<any[]> {
    const url = `${this.api}/best-selling-products/`; // Update the API URL as needed
    return this.httpClient.get<any[]>(url);
  }

  // getProductDataForPdf(categoryId:any) {
  //   const url = `${this.api}/catalogs/?id=${categoryId}`;
  //   return this.httpClient.get(url);
  // }

  getProductDataForPdf(categoryId:any) {
    const url = `${this.api}/catalogs/?id=${categoryId}`;
    return this.httpClient.get(url, { responseType: 'arraybuffer' });
  }

}
