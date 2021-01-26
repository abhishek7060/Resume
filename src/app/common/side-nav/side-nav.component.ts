import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  private currentTabRef: any;
  public currentSection: string = "home";
  constructor(public appService: AppServiceService) {
    this.currentTabRef = this.appService.currentTab.subscribe((res: string) => {
      this.currentSection = res;
    })
  }

  ngOnInit(): void {
  }
  scrollTO(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }
  open(type) {
    if (type == 'linkedin') {
      window.open("https://www.linkedin.com/in/anand6254/");
    }
    if (type == "instagram") {
      window.open("https://www.instagram.com/abhishek__anand_/?hl=en");
    }
    if (type == "facebook") {
      window.open("https://www.facebook.com/abhishek.anand.587");
    }
    if (type == "mail") {
      var a = document.createElement("a");
      a.href = "mailto:abhishek7060@gmail.com";
      a.click();
    }
  }
  ngOnDestroy() {
    this.currentTabRef.unsubscribe();
  }
}
