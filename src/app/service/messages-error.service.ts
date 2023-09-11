import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesErrorService {
  messageError: string = ""

  constructor() { }

  add(message: string){
    this.messageError = message;

    setTimeout(()=> {
      this.clear();
    }, 9000
    );
  }

  clear(){
    this.messageError = '';
  }

}
