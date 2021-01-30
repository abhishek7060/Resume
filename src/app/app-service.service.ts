import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private invokeSccrollToDashboard = new Subject();
  currentScroll = this.invokeSccrollToDashboard.asObservable();


  private activeTabInSideNav = new BehaviorSubject<String>("home");
  currentTab = this.activeTabInSideNav.asObservable();
  
  constructor(private http : HttpClient) { }

  invokeScroll() {
    this.invokeSccrollToDashboard.next();
  }
  changeTab(data) {
    this.activeTabInSideNav.next(data);
  }

  postMessage(input){
    return this.http.post("https://mailthis.to/abhishek-anand", input, {responseType : 'text'});
  }
}
