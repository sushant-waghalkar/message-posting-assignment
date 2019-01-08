import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    /**
    * This method for show alert message on DOM
    
    * @param not contain any parameter

    */
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
