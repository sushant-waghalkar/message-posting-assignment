import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['../app.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    //On page load logout the user
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.returnUrl = '/home';
    }

    /**
    * This is login method for checking users credintial
    
    * @param This method does not contain parameter

    * @return This method does not return any value

    */
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
