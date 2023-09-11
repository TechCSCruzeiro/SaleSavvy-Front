import { Component } from '@angular/core';
import { MessagesSuccessService } from 'src/app/service/messages-success.service';

@Component({
  selector: 'app-messages-success',
  templateUrl: './messages-success.component.html',
  styleUrls: ['./messages-success.component.css']
})
export class MessagesSuccessComponent {

  constructor (public messagesSuccessService: MessagesSuccessService){

  }

}
