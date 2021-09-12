import { Component, OnInit } from '@angular/core';
import {PasswordUser} from "../class/password-user";
import {UserService} from "../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {VerifyEmailUrl} from "../class/verify-email-url";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ChangePasswordUser} from "../class/change-password-user";

@Component({
  selector: 'app-forget-password-link',
  templateUrl: './forget-password-link.component.html',
  styleUrls: ['./forget-password-link.component.css']
})
export class ForgetPasswordLinkComponent implements OnInit {
  patternPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  newPassword: ChangePasswordUser = new ChangePasswordUser("", "", "", "")
  usernameKefi: any;
  resultEmailCode: any;
  emailVerification: VerifyEmailUrl = new VerifyEmailUrl("", "")
  tokenWaitResponse:any;
  checkValue:any;
  resultConfirmPassword: any;
  validationConfirmPassword: any;


  constructor(private serviceUsers: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const usernameId = this.route.snapshot.paramMap.get('username');
    const tokenVerifyMail = this.route.snapshot.paramMap.get('token');

    if (usernameId && tokenVerifyMail)
      this.usernameKefi = usernameId


    console.log(usernameId, tokenVerifyMail)
    if (usernameId !== null && tokenVerifyMail !== null) {
      this.emailVerification.user_name = usernameId
      this.emailVerification.urlToken = tokenVerifyMail
      this.getVerificationUrl(this.emailVerification)
    }
  }

  getVerificationUrl(emailObjectVerification: VerifyEmailUrl) {
    this.serviceUsers.checkUrlBeforePasswordChange(emailObjectVerification).pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe(result => {
      this.resultEmailCode = result
      if(this.resultEmailCode){
        this.tokenWaitResponse = true
        if(this.resultEmailCode.result === 'Valid_code'){
          this.checkValue = true
          this.newPassword.email = this.resultEmailCode.email
          this.newPassword.token = this.resultEmailCode.token
        }else{
          this.checkValue = false

        }
      }
      console.log(result)


    })
  }
  confirmPassword():void {
    this.serviceUsers.sendNewPassword(this.newPassword).pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe((result=>{
      console.log(result)
      if(result){
        this.resultConfirmPassword = result
        if(this.resultConfirmPassword.result === "resultConfirmPassword"){
        this.validationConfirmPassword = "confirmation_change"
        }else{
          this.validationConfirmPassword = "failed_change"
          setTimeout(()=>this.TimeOutConfirmPassword(), 5000)

        }
      }
    }))
  }

  TimeOutConfirmPassword(){
    this.validationConfirmPassword = ""
  }
}
