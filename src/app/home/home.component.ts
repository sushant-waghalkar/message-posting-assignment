import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    showNav;
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    //On page load call loadAllUsers method to show user list in DOM 
    ngOnInit() {
        this.showNav = true;
        this.loadAllUsers();
    }

    
    /**
    * This is deleteUser method delete current user
    
    * @param This is id parameter contain current user id type of number

    * @return This method does not return any value

    */
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    
    //call the service getall from userService for display all user list
    /**
    * This is loadAllUsers method
    
    * @param This method does not contain parameter

    * @return This method does not return any value

    */
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
