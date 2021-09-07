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
  constructor(private httpForgetPassword: UserService) { }

  ngOnInit(): void {
  }
  /*** Oublie de mon mot de passe pour un utilisateur****/
  forgetPasswordSubmit(): void{
    this.httpForgetPassword.iForgotMyPassword(this.emailToCheck).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        //this.checkMessage.checkMessageDisplay('error')
        return throwError(err);
      })
    ).subscribe(result =>{
        console.log(result)
      }
    )

  }

}
