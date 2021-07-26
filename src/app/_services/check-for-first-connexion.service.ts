import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CheckForFirstConnexionService {
  private messageSource = new BehaviorSubject<string>("not_the_first_connexion")
  currentMessage =this.messageSource.asObservable();
  constructor() { }


  checkForValidationForms(message: string){
    this.messageSource.next(message)

  }
}
