import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppServiceService } from '../app-service.service';

const areas = 'home,skills,expertise,contact';
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
  public FormData: FormGroup;

  // public currentSection = "home";

  constructor(public appService: AppServiceService, private builder: FormBuilder, private messageService: MessageService) {
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
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
    })
    var elements = document.getElementsByClassName('anim-typewriter');
    for (var i = 0; i < elements.length; i++) {
      if (this.myProfession) {
        this.TxtType(elements[i], this.myProfession, 4000);
      }
    }
  }
  
  scrollTo(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  onSubmit(FormData) {
    console.log(FormData)
    this.appService.postMessage(FormData)
      .subscribe(response => {
        this.messageService.add({severity:'success', summary:'Send Message', detail:'Thanks You for being here. シ '});
      }, error => {
      })
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


  open(type) {
    if (type == 'linkedin') {
      window.open("https://www.linkedin.com/in/anand6254/");
    }
    if (type == "mail") {
      var a = document.createElement("a");
      a.href = "mailto:abhishek7060@gmail.com";
      a.click();
    } if (type == "contact") {
      var a = document.createElement("a");
      a.href = "tel:+919078814225";
      a.click();
    }
  }
}
