import { Component,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'instantLight';
  constructor(
    private renderer: Renderer2,public _router: Router
  ) { }

  ngOnInit() {

    const javaScriptForHead = this.renderer.createElement('script');
    javaScriptForHead.src = `../../assets/js/header.js`;
    this.renderer.appendChild(document.head, javaScriptForHead);
  }
}
