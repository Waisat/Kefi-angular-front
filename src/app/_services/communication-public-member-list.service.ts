import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GetAllPublicUsers} from "../class/get-all-public-users";

@Injectable({
  providedIn: 'root'
})
export class CommunicationPublicMemberListService {
  private messageSource = new BehaviorSubject<GetAllPublicUsers>({offset:"", limit:"", search_options:"",job:"", page:""})
  currentMessage =this.messageSource.asObservable();
  private messageDisplay = new BehaviorSubject<string>("default")
  messageToCheck = this.messageDisplay.asObservable()
  constructor() { }

  changeNavUrl(message: any){
    this.messageSource.next(message)

  }

  checkMessageDisplay(message: any){
    this.messageDisplay.next(message)
    if(message !== "default"){
      setTimeout(()=>this.setIntervalAfterCheck(), 3000)
    }


  }

  setIntervalAfterCheck(){
    this.checkMessageDisplay('default')
  }
}
