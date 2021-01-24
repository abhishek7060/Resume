import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppServiceService } from '../app-service.service';

const areas = 'home,skills';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public myProfession = ["FULL STACK DEVELOPER", "UI/UX DESIGNER"];
  loopNum: number;
  el: any;
  toRotate: any;
  period: number;
  txt: string;
  isDeleting: boolean;
  private scrollSub: any;

  // public currentSection = "home";

  constructor(public appService: AppServiceService) {
    this.scrollSub = this.appService.currentScroll.subscribe(res => {
      this.onScroll();
    })
  }

  @ViewChildren(areas) sections: QueryList<ElementRef>;
  onScroll() {
    const activeSection = this.sections.toArray().findIndex(section => this.isElementInViewport(section.nativeElement));
    // this.currentSection = areas.split(',')[activeSection];
    this.appService.changeTab(areas.split(',')[activeSection]);
  }
  isElementInViewport(el): unknown {
    var rect = el.getBoundingClientRect();
    return (
      rect.bottom - 100 >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ngOnInit() {
    var elements = document.getElementsByClassName('anim-typewriter');
    for (var i = 0; i < elements.length; i++) {
      if (this.myProfession) {
        this.TxtType(elements[i], this.myProfession, 4000);
      }
    }
  }

  ngOnDestroy() {
    this.scrollSub.unsubscribe();
  }

  TxtType(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 4000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  tick() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }

}
