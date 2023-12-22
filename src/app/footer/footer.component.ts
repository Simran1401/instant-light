import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/apiServices/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  contactInfo: any;
  successMessege!: string;
  errorMessage!: string;

  constructor( private elementRef: ElementRef,private toaster:ToastrService, private fb: FormBuilder,private apiService: ApiService , private router:Router) { }


  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitted = false;

  ngOnInit(){
    this.fetchContactInfo()
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

  get gemail() {
    return this.contactForm.get('email');
  }

  fetchContactInfo() {
    this.apiService.getContactInfo().subscribe(
      (data) => {
        console.log("Contact Info", data);
        this.contactInfo = data;
      });
  }

  redirect(slug: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['static-pages', slug], { queryParams: {} });
  }

  onSubscribe() {
    if (this.contactForm.invalid) {
      this.errorMessage = 'Please enter email';
      this.successMessege = ''; // Clear success message
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return; // Return if form is invalid
    }
  
    const email = this.contactForm.value.email; // Get the email from the form
  
    this.apiService.subscribeToNewsletter(email).subscribe(
      (response: any) => {
        if (response.IsSuccess === 'True') {
          this.successMessege = 'NewsLetter Send Successfully';
          this.errorMessage = ''; // Clear error message
          setTimeout(() => {
            this.successMessege = '';
          }, 3000);
        } else {
          this.errorMessage = 'Email already subscribed';
          this.successMessege = ''; // Clear success message
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      },  
      error => {
        this.errorMessage = 'Email already subscribed';
        this.successMessege = ''; // Clear success message
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  
    this.contactForm.reset(); // Reset the form
  }
  

}
