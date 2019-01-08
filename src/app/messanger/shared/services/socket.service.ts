import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../mod/message';
import { Event } from '../mod/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
    private socket;

    
    /**
    * This is initSocket method intiate the socketIo
    
    * @param This method not contain any parameter

    * @return This method does not return any value

    */      
    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    
    /**
    * This is send method emit the message
    
    * @param This is the message attribute  parameter type is string

    * @return This method does not return any value

    */
    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    
    /**
    * This is onMessage method assign value to observer
    
    * @param This method does not contain attribute

    * @return return a observable version of message

    */
    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    
    /**
    * This is onEvent method show server status
    
    * @param This is event parameter type of Event object

    * @return return a observable version of message

    */
    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
