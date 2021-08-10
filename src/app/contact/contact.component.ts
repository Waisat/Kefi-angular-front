import { Component, OnInit } from '@angular/core';
import {ContactForm} from "../class/contact-form";
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formContact:any;
  emailPattern:RegExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  messageSuccess:any
  errorMessage:any
  constructor(private contact: UserService) { }

  ngOnInit(): void {
    this.formContact = new ContactForm("", "","","")
  }

  checkFormBeforSend(){
    var result;
    if (this.formContact.name === undefined || null || "") {
      return false
    } else if (this.formContact.email === undefined || null || "") {
      return false
    } else if (this.formContact.subject === undefined || null || "") {
      return false
    } else if(this.formContact.message === undefined || null || ""){
      return false
    }else{
      return true
    }


  }

  contactMessage() {
   var check = this.checkFormBeforSend()
    if(check){
      this.contact.sendAMessage(this.formContact).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.errorMessage = true
          setTimeout(()=>this.setIntervalAfter(this.errorMessage), 3000)
          return throwError(err);
        })
      ).subscribe((result=>{
        console.log(result)
        if(result){
          this.messageSuccess = true
          let inputContactForm = document.getElementsByTagName('input')
          for(let i = 0; i < inputContactForm.length -1; i++){
            inputContactForm[i].value = ""
          }
          setTimeout(()=>this.setIntervalAfter(this.messageSuccess), 3000)
        }
      }))

    }else{
      this.errorMessage = true
      setTimeout(()=>this.setIntervalAfter(this.errorMessage), 3000)
    }

  }
  setIntervalAfter(value:boolean){
    this.errorMessage =  false
    this.messageSuccess = false
    console.log(value)
  }
}
