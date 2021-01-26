import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppServiceService } from './app-service.service';
const areas = 'a,b,c';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'abhishek';
  public enableNavPanel = false;
  public lightTheme = true;
  constructor(public appService: AppServiceService
  ) { }

  ngOnInit() {
    this.setTheme('theme-light');
  }

  ngAfterViewInit() {

    setTimeout(() => {
      document.getElementById("themeSelector").classList.add("displaySelector");
      setTimeout(() => {
        document.getElementById("themeSelector").classList.remove("displaySelector");
      }, 2000);
    }, 1000);
  }

  onScroll() {
    this.appService.invokeScroll();
  }

  // function to set a given theme/color-scheme
  setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  // function to toggle between light and dark theme
  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    if (this.lightTheme) {
      this.setTheme('theme-light');
    } else {
      this.setTheme('theme-dark');
    }
  }
}
