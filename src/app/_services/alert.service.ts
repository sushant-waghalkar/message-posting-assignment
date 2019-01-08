import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    
    /**
    * This is success method for showing susscess message to user
    
    * @param contain parameter message and keepAfterNavigationChange with type string and boolean

    * @return This method does not return any value

    */
    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    
    /**
    * This is error method for showing error message to user
    
    * @param contain parameter message and keepAfterNavigationChange with type string and boolean

    * @return This method does not return any value

    */
    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    
    /**
    * This is getMessage method for showing custom message to user
    
    * @param This method does not contain any parameter

    * @return return subject of type observable

    */
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
