import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppServiceService } from './app-service.service';
const areas = 'a,b,c';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abhishek';
  public enableNavPanel = false;
  constructor( public appService: AppServiceService
  ) { }

  onScroll(){
    this.appService.invokeScroll();
  }
}
