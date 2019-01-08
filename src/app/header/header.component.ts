import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/index';
import { Component, OnInit } from '@angular/core';
//import { User } from '../_models/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //currentUser: User;
  isLoggedIn$: Observable<boolean>;
  
  constructor(private authService: AuthenticationService) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
  }

  //On page load assign user login status to a variable in boolean type  
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


}
