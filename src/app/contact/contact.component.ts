import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  bannerData: any;
  apiUrl = 'https://il.gftpl.in'
  contactInfo: any;
  loading:boolean=false

  constructor(private scrollToService: ScrollToService,private toastr:ToastrService, private elementRef: ElementRef, private fb: FormBuilder,private apiService: ApiService) { }

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  submitted = false;

  ngOnInit() {
    this.loading=true;
    this.getBanner();
    this.fetchContactInfo();
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      // Here you can handle the form submission
      // For example, you can send the form data to your backend API
      console.log('Form submitted successfully');
      console.log(this.contactForm.value);
    }

    setTimeout(() => {
      this.submitted=false;
    }, 3000);
  }

  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  get gname() {
    return this.contactForm.get('name')?.value;
  }

  get gemail() {
    return this.contactForm.get('email');
  }

  get gmsg() {
    return this.contactForm.get('msg');
  }

  getBanner() {
    this.apiService.getGetInTouchBanner().subscribe(res => {
      console.log("contact banner", res);
      this.bannerData = res;
    })
  }

  fetchContactInfo() {
    this.apiService.getContactInfo().subscribe(
      (data) => {
        console.log("Contact Info", data);
        this.contactInfo = data;
        this.loading=false
      });
  }

  contactRes: any
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
