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

    //initSocket() create instance of socketIo
    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    //Get msg content from chat.component and then emit msg content 
    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    //subscribe message data from observer    
    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    //show server status like connect and disconnect
    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
