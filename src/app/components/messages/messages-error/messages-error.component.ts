import { Component } from '@angular/core';
import { MessagesErrorService } from 'src/app/service/messages-error.service';

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages-error.component.html',
  styleUrls: ['./messages-error.component.css']
})
export class MessagesErrorComponent {

  constructor (public messagesErrorService: MessagesErrorService){

  }
}
