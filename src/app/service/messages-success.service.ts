import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesSuccessService {
  messageSuccess: string = ''

  constructor() { }

  add(messageSuccess: string){
    this.messageSuccess = messageSuccess;
    setTimeout(()=> {
      this.clear();
    }, 9000);
  }

  clear(){
    this.messageSuccess = '';
  }
}
