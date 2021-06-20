import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberAreaCommunicationService {
  private messageSource = new BehaviorSubject<string>("daufault-message")
  currentMessage =this.messageSource.asObservable();

  constructor() { }

  changeNavUrl(message: any){
    this.messageSource.next(message)
  }
}
