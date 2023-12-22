import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ElectronicSuppliesComponent } from './electronic-supplies/electronic-supplies.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TandcComponent } from './tandc/tandc.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { PrivacyPlicyComponent } from './privacy-plicy/privacy-plicy.component';
import { PdfsComponent } from './pdfs/pdfs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'category/:id', component: ElectronicSuppliesComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog-details/:slug', component: BlogDetailsComponent },
  { path: 'catalogues', component: CataloguesComponent },
  { path: 'faq', component: FaqsComponent },
  { path: 'static-pages/:type', component: PrivacyPlicyComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'pdf/:id', component: PdfsComponent },
  { path: 'products-page/:id', component: ProductsPageComponent },
  { path: 'products-page/:subcategory-group', component: ProductsPageComponent },
  { path: 'products-page/:id/:subcategory', component: ProductsPageComponent },
  { path: 'product-details-page/:id', component: ProductDetailsPageComponent },
  {
    path: 'search',
    loadChildren: () =>
      import('./mobile-search/mobile-search.module').then((m) => m.MobileSearchModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
