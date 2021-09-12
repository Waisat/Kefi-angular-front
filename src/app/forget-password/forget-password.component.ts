import { Component, OnInit } from '@angular/core';
import {ForgetPassword} from "../class/forget-password";
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailPattern:RegExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailToCheck:ForgetPassword =  new ForgetPassword("")
  emailToVerifyEmailSend: any;
  resultFromForgetPassword: any;
  constructor(private httpForgetPassword: UserService) { }

  ngOnInit(): void {
  }
  /*** Oublie de mon mot de passe pour un utilisateur****/
  forgetPasswordSubmit(): void{
    this.httpForgetPassword.iForgotMyPassword(this.emailToCheck).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);

        return throwError(err);
      })
    ).subscribe(result =>{

      this.resultFromForgetPassword = result
      if(this.resultFromForgetPassword.status_verify === "okay"){
        this.emailToVerifyEmailSend = {status:"email_send", message:"Un email vient de vous être envoyé afin de réinitialiser votre mot de passe"}

        this.emailToCheck.email = ""
        setTimeout(()=> this.hideMessage(), 5000)
      }else if(this.resultFromForgetPassword.status_verify === "email-not-confirm"){
        this.emailToVerifyEmailSend = {status:"email_send", message:"Un email vient de vous être envoyé afin de confirmer votre compte et choisir votre mot de passe"}

       this.emailToCheck.email = ""
        setTimeout(()=> this.hideMessage(), 5000)

      }else{
        this.emailToVerifyEmailSend = {status:"email_not_send", message:"Il semble que vous ne soyez pas inscrit parmis nos membre envoyé nous un mail en cas d'erreur de notre part"}
        this.emailToCheck.email = ""
        setTimeout(()=> this.hideMessage(), 5000)

      }

      }
    )

  }

  hideMessage(){
    this.emailToVerifyEmailSend.status = "hide"

  }

}
