import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { User } from './shared/mod/user';
import { SocketService } from './shared/services/socket.service';
import { Message } from './shared/mod/message';
import { Event } from './shared/mod/event';
import { currentUser } from './_models/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'messanger.component.html',
    styleUrls: ['./messanger.component.css']
})

export class MessangerComponent implements OnInit {
    today: number;
    ioConnection: any;
    messages: Message[] = [];
    //time: any = [];
    messageContent: string;
    username:any;
    currentUser: currentUser;

    constructor(private socketService: SocketService          
    ) {this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

    ngOnInit() {
        this.initIoConnection();  
        this.username = this.currentUser.username;
        console.log("this.currentUser---",this.currentUser.username)
        }

        public sendMessage(message: string): void {
            if (!message) {
              return;
            } 
            this.today = Date.now();
            this.socketService.send({
              from: this.username,
              content: message,
              time: this.today
            });
            this.messageContent = null;
          }

        private initIoConnection(): void {
            this.socketService.initSocket();
        
            this.ioConnection = this.socketService.onMessage()
              .subscribe((message: Message) => {
                
                this.messages.push(message);
                //this.time = this.today;
              });
        
        
            this.socketService.onEvent(Event.CONNECT)
              .subscribe(() => {
                console.log('connected');
              });
        
            this.socketService.onEvent(Event.DISCONNECT)
              .subscribe(() => {
                console.log('disconnected');
              });
          }
}
