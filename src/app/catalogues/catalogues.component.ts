import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ApiService } from '../services/apiServices/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';


@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css'],
})
export class CataloguesComponent {
  bannerData: any;
  apiUrl = 'https://il.gftpl.in'
  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;
  pdfContentVisible = true;
  loading: boolean = true;
  loadingPdf: boolean = false;

  constructor(private scrollToService: ScrollToService, private elementRef: ElementRef, private apiService: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.getBanner();
    this.getCategories();
  }

  //   async generatePDF() {
  //     this.pdfContentVisible = false;

  //     const pdf = new jsPDF.default();
  //     const content = this.pdfContent.nativeElement;

  //     try {
  //         const canvas = await html2canvas(content);
  //         const imgData = canvas.toDataURL('image/png');

  //         pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  //         pdf.save('catalogue.pdf');
  //     } catch (error) {
  //         console.error('Error generating PDF:', error);
  //     }

  //     this.pdfContentVisible = true;
  // }



  // async generatePDF() {
  //   this.pdfContentVisible = false;

  //   const pdf = new jsPDF('p', 'pt', 'a4'); 
  //   const content = this.pdfContent.nativeElement;

  //   try {
  //     const canvas = await html2canvas(content);
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0); 

  //     const elementWidth = content.offsetWidth;
  //     const elementHeight = content.offsetHeight;

  //     const topLeftMargin = 15;

  //     let pdfWidth = elementWidth + topLeftMargin * 2;
  //     let pdfHeight = elementHeight + topLeftMargin * 2;

  //     const canvasImageWidth = elementWidth;
  //     const canvasImageHeight = elementHeight;

  //     const totalPDFPages = Math.ceil(elementHeight / pdfHeight);

  //     pdf.addImage(imgData, 'JPEG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);

  //     for (let i = 1; i < totalPDFPages; i++) {
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'JPEG', topLeftMargin, -(pdfHeight * i) + topLeftMargin, canvasImageWidth, canvasImageHeight);
  //     }

  //     pdf.save('catalogue.pdf');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }

  //   this.pdfContentVisible = true;
  // }


  // async generatePDF() {
  //   this.pdfContentVisible = false;

  //   const pdf = new jsPDF.default();
  //   const content = this.pdfContent.nativeElement;

  //   try {
  //       const canvas = await html2canvas(content, { scale: 2 }); // Adjust scale as needed for clarity
  //       const imgData = canvas.toDataURL('image/png');

  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();

  //       const imgWidth = pdfWidth; // Set the image width to match the PDF width
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       let yPos = 0;
  //       const maxPageHeight = pdfHeight - 20; // Leave some margin at the bottom

  //       while (yPos < imgHeight) {
  //           const remainingHeight = imgHeight - yPos;
  //           const currentHeight = Math.min(maxPageHeight, remainingHeight);

  //           pdf.addImage(imgData, 'PNG', 0, yPos, imgWidth, currentHeight);

  //           yPos += currentHeight;

  //           if (yPos < imgHeight) {
  //               pdf.addPage(); // Add a new page if content remains
  //           }
  //       }

  //       pdf.save('catalogue.pdf');
  //   } catch (error) {
  //       console.error('Error generating PDF:', error);
  //   }

  //   this.pdfContentVisible = true;
  // }




  triggerScrollTo() {
    const aboutSection2Element = this.elementRef.nativeElement.querySelector('#destination');
    if (aboutSection2Element) {
      aboutSection2Element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  activeCategory = 'all'; // Initialize the active category
  catalogs: any[] = [];
  // catalogs = [
  //   { category: 'all', image: '../../assets/imgs/image 6.png', show: true },
  //   { category: 'led', image: '../../assets/imgs/image 6.png', show: true },
  //   { category: 'fireplace', image: '../../assets/imgs/Rectangle 14 (3).png', show: true },
  //   { category: 'hvac', image: '../../assets/imgs/HVAC-DISPLAY.jpg', show: true },
  //   { category: 'electrical', image: '../../assets/imgs/Group 329.png', show: true },
  // ];

  filterCatalog(category: string): void {
    this.activeCategory = category; // Update the active category
    this.catalogs.forEach(catalog => {
      catalog.show = (category === 'all' || catalog.category === category);
    });
  }

  getBanner() {
    this.apiService.getCatalogsBanner().subscribe(res => {
      console.log("catalogues banner", res);
      this.bannerData = res;
    })
  }

  getCategories() {
    this.apiService.getProductCategoryHome().subscribe(
      (response: any) => {
        // Map the API response to your catalogs array
        this.catalogs = response.map((category: any) => ({
          category: category.title, // Use the title from the API response
          image: this.apiUrl + category.image, // Use the image path from the API response
          show: true,
          id: category.id
        }),
          this.loading = false);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // openPdf(id: any) {
  //   this.apiService.getProductDataForPdf(id).subscribe((res: any) => {
  //     console.log("pdf data", res);
  //     const blob = new Blob([res], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     window.open(url, '_blank');
  //   })
  // }


  openPdf(id: any, catalog: any) {
    catalog.loadingPdf = true; // Start loading for the specific catalog item
  
    this.apiService.getProductDataForPdf(id).subscribe((res: any) => {
      console.log("pdf data", res);
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
  
      const newTab = window.open(url, '_blank');
      setTimeout(() => {
        catalog.loadingPdf=false; // Close the new tab after a delay (adjust the delay as needed)
      }, 3000); 
      
      // Check if the newTab is not null before accessing onload
      if (newTab) {
        newTab.onload = () => {
          catalog.loadingPdf = false; // Reset loading for the specific catalog item
        }
      } else {
        catalog.loadingPdf = false; // Reset loading in case of popup block
        console.error("Popup blocked; couldn't open PDF in a new tab.");
        // Handle popup blocking gracefully for the specific catalog item.
      }
    });
  }
  
  

}
