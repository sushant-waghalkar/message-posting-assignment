import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    /**
    * This is getAll method for getting all user list
    
    * @param This method contain url as parameter

    * @return return response data after calling rest api

    */
    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    
    /**
    * This is getById method for getting detail of user by sending user id 
    
    * @param Contain id parameter with type of number

    * @return return response data after calling rest api

    */
    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    
    /**
    * This is create method for creating new user 
    
    * @param Contain user parameter with type of user object

    * @return return response after calling the rest api

    */
    create(user: User) {
        return this.http.post('/api/users', user);
    }

    
    /**
    * This is update method for update existing user details 
    
    * @param Contain user parameter with type of user object

    * @return return response after calling the rest api

    */
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    
    /**
    * This is delete method for delete existing user 
    
    * @param Contain id parameter with type of number

    * @return return response message after calling the rest api

    */
    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
