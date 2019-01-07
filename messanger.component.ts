import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    messageContent: string;
    username:any;
    currentUser: currentUser;

    constructor(private socketService: SocketService          
    ) {this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

        //onpage load call initIoConnection() method and assigned currentuser name to variable  
        ngOnInit() {
          this.initIoConnection();  
          this.username = this.currentUser.username;
          console.log("this.currentUser---",this.currentUser.username)
        }

        //function send message content and date,time to socketService.send method
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
        
        //initIoConnection() call three method from socket service initSocket(),onMessage(),onEvent()
        //initSocket() create instance of socketIo 
        //onMessage() subscribe message data from observer    
        //onEvent() show server status like connect and disconnect
        private initIoConnection(): void {
            this.socketService.initSocket();
            this.ioConnection = this.socketService.onMessage()
              .subscribe((message: Message) => {
                  this.messages.push(message);
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
