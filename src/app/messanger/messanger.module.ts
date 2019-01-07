import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessangerComponent } from './messanger.component';
import { SocketService } from './shared/services/socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MessangerComponent ],
  providers: [SocketService],
  entryComponents: []
})
export class MessangerModule { }
