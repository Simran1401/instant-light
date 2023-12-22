import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbCollapseModule, NgbOffcanvas, OffcanvasDismissReasons, NgbAccordionModule,
  NgbDropdownModule, NgbScrollSpyModule, NgbCarousel, NgbCarouselModule,
  NgbSlideEvent, NgbSlideEventSource, NgbNavModule, NgbAlert, NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeSectionTwoComponent } from './home/home-section-two/home-section-two.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeSectionSevenComponent } from './home/home-section-seven/home-section-seven.component';
import { AboutComponent } from './about/about.component';
import { ElectronicSuppliesComponent } from './electronic-supplies/electronic-supplies.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TandcComponent } from './tandc/tandc.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { PrivacyPlicyComponent } from './privacy-plicy/privacy-plicy.component';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './safeUrl.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { PdfsComponent } from './pdfs/pdfs.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HomeSectionFiveComponent } from './home/home-section-five/home-section-five.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SimilarProductsComponent } from './product-details-page/similar-products/similar-products.component';


const routes: Routes = [
  // Define your routes here
];

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SearchComponent,
    HomeSectionTwoComponent,
    HomeSectionSevenComponent,
    AboutComponent,
    ElectronicSuppliesComponent,
    BlogsComponent,
    BlogDetailsComponent,
    CataloguesComponent,
    ContactComponent,
    FaqsComponent,
    TandcComponent,
    ProductsPageComponent,
    ProductDetailsPageComponent,
    PrivacyPlicyComponent,
    SafeUrlPipe,
    PdfsComponent,
    HomeSectionFiveComponent,
    SimilarProductsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule,
    RouterLink, RouterModule.forRoot(routes),
    CarouselModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbScrollSpyModule,
    ScrollToModule.forRoot(),
    NgbCarouselModule,
    NgFor,
    NgbNavModule,
    NgbAlert,
    NgbAlertModule,
    NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
    NgIf,
    NgxImageZoomModule,
    [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })]
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
