import { Component, HostListener, ElementRef } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  whyChooseUsData: any;
  qualityMattersData: any;
  solutionAllLightingData: any;
  ourAchievementsData: any;
  teamMembers: any[] = [];
  bannerData: any;
  apiUrl = 'https://il.gftpl.in';
  loading: boolean = false;
  ProudPartnersdata!:any;

  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef,private apiService: ApiService) { }


  ngOnInit() {
    this.loading=true
    this.fetchWhyChooseUs();
    this.fetchQualityMattersAbout();
    this.fetchSolutionAllLighting();
    this.fetchOurAchievements();
    this.fetchTeamMembers();
    this.getBanner();
    this.fetchProudPartners()
  }

  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getBanner() {
    this.apiService.getAboutBanner().subscribe(res => {
      console.log("about banner", res);
      this.bannerData = res;
      this.loading=false;
    })
  }

  fetchWhyChooseUs() {
    this.apiService.getWhyChooseUs().subscribe(
      (data) => {
        console.log("WhyChooseUs",data);
        this.whyChooseUsData = data;
      });
  }

  fetchQualityMattersAbout() {
    this.apiService.getQualityMattersAbout().subscribe(
      (data) => {
        console.log("qualityMatters",data);
        this.qualityMattersData = data;
      });
  }

  fetchSolutionAllLighting() {
    this.apiService.getSolutionAllLighting().subscribe(
      (data) => {
        console.log("solutionAllLighting",data);
        this.solutionAllLightingData = data;
      });
  }

  fetchOurAchievements() {
    this.apiService.getOurAchievements().subscribe(
      (data) => {
        console.log("ourAchievementsData",data);
        this.ourAchievementsData = data;
      });
  }

  fetchTeamMembers() {
    this.apiService.getTeamMembers().subscribe(res => {
      this.teamMembers = res;
      console.log("team",res);
      
    });
  }

  fetchProudPartners() {
    this.apiService.getProudPartners().subscribe(
      (data: any[]) => {
        console.log("Proud Partners", data);
        this.ProudPartnersdata = data;
      });
  }

}
