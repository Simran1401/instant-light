import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/apiServices/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  panels = ['What types of lighting products do you offer?', 'What are the benefits of using LED lights?', 'Are your lighting products energy-efficient?', 'What is the warranty period for your lighting products?', 'Can I dim the lights I purchase from your website?'];
  bannerData: any;
  shopByCategoryData: any;
  qualityMattersCardsData!: any[];
  ProudPartnersdata!:any;
  oneStopShopData: any;
  faqData!: any[];
  contactInfo: any;
  qualityMattersData: any;
  loading:boolean=true;
  contactRes: any;
  apiUrl = 'https://il.gftpl.in';
  bestSellingProducts: any[] = [];
  @ViewChild('section1', { static: false }) section1!: ElementRef;
  @ViewChild('section2', { static: false }) section2!: ElementRef;
  // Add more @ViewChild declarations for additional sections if needed

 
  constructor(private elementRef: ElementRef, private fb: FormBuilder,private toastr:ToastrService,  private apiService: ApiService) { }

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  ngAfterViewInit() {
    const options = {
      threshold: 0.5, // Trigger the animation when the section is 50% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, options);

    // Start observing the sections
    observer.observe(this.section1.nativeElement);
    observer.observe(this.section2.nativeElement);
    // Add more observations for other sections if needed
  }

  ngOnInit(): void {
    this.loading=true;
    this.getBanner();
    this.fetchQualityMatters();
    this.fetchQualityMattersCards();
    this.fetchOneStopShopData();
    this.fetchFAQs();
    this.fetchContactInfo();
    this.fetchProudPartners();
    this.apiService.getBestSellingProducts().subscribe(data => {
      this.bestSellingProducts = data;
      console.log("bestSellingProducts",data);
      
    });
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      // Here you can handle the form submission
      // For example, you can send the form data to your backend API
      console.log('Form submitted successfully');
      console.log(this.contactForm.value);
    }

    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  get gname() {
    return this.contactForm.get('name')?.value;
  }

  get gemail() {
    return this.contactForm.get('email')?.value;
  }

  get gmsg() {
    return this.contactForm.get('msg')?.value;
  }


  getBanner() {
    this.apiService.getHomeBanner().subscribe(res => {
      console.log("home banner", res);
      this.bannerData = res;
      this.loading=false
    })
  }

  fetchQualityMatters() {
    this.apiService.getQualityMatters().subscribe(res => {
      console.log("Quality matters", res);
      this.qualityMattersData = res;
    });
  }

  fetchShopByCategory() {
    this.apiService.getShopByCategory().subscribe(res => {
      console.log("ShopByCategory", res);
      this.shopByCategoryData = res;
    });
  }

  fetchQualityMattersCards() {
    this.apiService.getQualityMattersCards().subscribe(
      (data: any[]) => {
        console.log("Quality Matters Cards", data);
        this.qualityMattersCardsData = data;
      });
  }

  fetchOneStopShopData() {
    this.apiService.getOneStopShopData().subscribe(
      (data) => {
        console.log("One Stop Shop Data", data);
        this.oneStopShopData = data;
      });
  }

  fetchFAQs() {
    this.apiService.getFAQs().subscribe(
      (data: any[]) => {
        console.log("faqs", data);
        this.faqData = data;
      });
  }

  fetchContactInfo() {
    this.apiService.getContactInfo().subscribe(
      (data) => {
        console.log("Contact Info", data);
        this.contactInfo = data;
      });
  }

  fetchProudPartners() {
    this.apiService.getProudPartners().subscribe(
      (data: any) => {
        console.log("Proud Partners", data);
        this.ProudPartnersdata = data;
      });
  }
  
  addContactUs() {

    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      this.apiService.sendContactForm(this.contactForm.value).subscribe(res => {
        console.log(res);
        this.contactRes = res;
        if (this.contactRes.msg) {
          this.toastr.success(this.contactRes.msg)
          console.log(this.contactRes.msg);
          
          this.contactForm.reset()
        }
      })
    } else {
      this.contactForm.markAllAsTouched();
      this.submitted=true
    }
    setTimeout(() => {
      this.submitted=false;
    }, 3000);

  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email')
  }
  get message() {
    return this.contactForm.get('message')
  }

}
