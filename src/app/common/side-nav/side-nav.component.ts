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
  ngOnDestroy(){
    this.currentTabRef.unsubscribe();
  }
}
