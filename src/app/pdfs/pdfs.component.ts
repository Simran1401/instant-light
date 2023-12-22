import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/apiServices/api.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent {
  
   @ViewChild('invoice')
  invoiceElement!: ElementRef;
  company: any;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef, private apiService: ApiService) { }
  pdfProducts: any;
  id: any;
  apiUrl = 'https://il.gftpl.in'
  loading: boolean = true;

  ngOnInit() {
    this.loading=true;
    this.id=this.route.snapshot.paramMap.get('id')
    this.fetchPRoductsForPdf(this.id);
  }

  fetchPRoductsForPdf(categoryId: number) {
    this.apiService.getProductDataForPdf(categoryId).subscribe(
      (data: any) => {
        this.pdfProducts = data; 
        console.log('Products:', this.pdfProducts);
        this.loading = false;
      },
      error => {
        console.error('Error fetching subcategory groups:', error);
      }
    );
  }

  printInvoice() {
    const elementWidth = this.invoiceElement.nativeElement.offsetWidth;
    const elementHeight = this.invoiceElement.nativeElement.offsetHeight;
    console.log('Element width:', elementWidth);

    const invoice = this.invoiceElement.nativeElement;

    const htmlWidth = elementWidth;
    const htmlHeight = elementHeight;

    const topLeftMargin = 5;

    let pdfWidth = htmlWidth + (topLeftMargin * 2);
    let pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 5);

    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;

    const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

    html2canvas(invoice).then(canvas => {

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    
      pdf.addImage(imgData, 'jpeg', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
    
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([pdfWidth, pdfHeight], 'p');
        pdf.addImage(imgData, 'jpeg', topLeftMargin, - (pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
      }
    
      pdf.save(`Document ${new Date().toLocaleString()}.pdf`);
    });
    
  }
  

  // inonepage

  // printInvoice() {
  //   const elementWidth = this.invoiceElement.nativeElement.offsetWidth;
  //   const elementHeight = this.invoiceElement.nativeElement.offsetHeight;
  //   console.log('Element width:', elementWidth);

  //   const invoice = this.invoiceElement.nativeElement;

  //   const htmlWidth = elementWidth;
  //   const htmlHeight = elementHeight;

  //   const topLeftMargin = 5;

  //   let pdfWidth = htmlWidth + (topLeftMargin * 2);
  //   let pdfHeight = htmlHeight + (topLeftMargin * 2);
    

  //   const canvasImageWidth = htmlWidth;
  //   const canvasImageHeight = htmlHeight;

  //   const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;

  //   html2canvas(invoice, {useCORS:true,allowTaint:false, logging:true}).then(canvas => {

  //     const imgData = canvas.toDataURL("image/jpeg", 1.0);
  //     let pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    
  //     pdf.addImage(imgData, 'jpeg', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
    
  //     for (let i = 1; i <= totalPDFPages; i++) {
  //       pdf.addPage([pdfWidth, pdfHeight], 'p');
  //       pdf.addImage(imgData, 'jpeg', topLeftMargin, - (pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
  //     }
    
  //     pdf.save(`Document ${new Date().toLocaleString()}.pdf`);
  //   });
    
  // }

  // how to generate a pdf from html in angular?
 
  
  
}
