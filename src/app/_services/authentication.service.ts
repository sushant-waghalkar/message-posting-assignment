import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
    * This is isLoggedIn method for checking user login status
    
    * @param This method do not contain parameter

    * @return return loggedIn of type observable

    */
    get isLoggedIn() {
    return this.loggedIn.asObservable();
    }


    /**
    * This is login method for checking user credintial
    
    * @param contain arguments username and password type of string

    * @return This method do not return any value

    */
    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.loggedIn.next(true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    
    /**
    * This is logout method for remove user from local storage to log out
    
    * @param This method do not contain parameter

    * @return This method do not return any value

    */
    logout() {
        // 
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
