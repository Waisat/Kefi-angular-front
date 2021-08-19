import { Component, OnInit } from '@angular/core';
import {PasswordUser} from "../class/password-user";
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {VerifyEmailUrl} from "../class/verify-email-url";
import {CookieService} from "ngx-cookie";
import {CheckToken} from "../_utilities/CheckToken";
import {MemberAreaCommunicationService} from "../_services/member-area-communication.service";
import {UsernameResendCodeEmail} from "../class/username-resend-code-email";
import set = gsap.set;
import {CommunicationPublicMemberListService} from "../_services/communication-public-member-list.service";
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  patternPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  private emailUserVerify: any
  constructor(private user_http: UserService,  private route: ActivatedRoute, private router: Router, private cookieService:CookieService, private MemberAreaList: MemberAreaCommunicationService, private checkMessage: CommunicationPublicMemberListService ) { }
  UserPassword: PasswordUser = new PasswordUser("","", "")
  emailVerification: VerifyEmailUrl = new VerifyEmailUrl("","")
  tokenUser: any;
  parseTokenUser:any;
  userTokenCheck:any = []
  IsWait:boolean = true
  getErrorValidationCode:any;
  resultEmailVerify:any
  userNameIdKefi:any
  resendVerifyCodeMessage:any;
  emailResendOk:any

  ngOnInit(): void {
    const usernameId = this.route.snapshot.paramMap.get('username');
    const tokenVerifyMail = this.route.snapshot.paramMap.get('token');
    if(usernameId && tokenVerifyMail)
      this.userNameIdKefi = usernameId


    console.log(usernameId, tokenVerifyMail)
    if(usernameId !== null && tokenVerifyMail !== null){
      this.emailVerification.user_name = usernameId
      this.emailVerification.urlToken = tokenVerifyMail
      this.getVerificationUrl(this.emailVerification)
    }

  }

  getVerificationUrl(emailObjectVerification:VerifyEmailUrl){
    this.user_http.verifyEmail(emailObjectVerification).pipe(catchError(err=>{
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe(result=>{
      this.resultEmailVerify  = result
      if(this.resultEmailVerify.email === 'invalid'){
        this.getErrorValidationCode = true

      }else if(this.resultEmailVerify.email === 'Email_verify' || this.resultEmailVerify.email === 'notFind_user'){
          this.router.navigate(['/accueil'])
      }else{
          this.emailUserVerify = result
        }

    })
  }

  passwordConfirmation(){
    this.UserPassword.email = this.emailUserVerify.email

    this.user_http.updatePasswordMember(this.UserPassword).pipe(
      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result =>{
      this.tokenUser = result
      this.parseTokenUser = JSON.parse(this.tokenUser)
      let timer = new Date(Date.now() +  3600000 )
      this.cookieService.put(this.parseTokenUser.name, this.parseTokenUser.jwt, {domain:"kefiassociation.fr", expires:(timer.toString()), secure:true})
      const token = this.user_http.getCookieJwt("kefi_token")
      if(token){
        this.IsWait = false
        CheckToken(this.user_http, this.IsWait, this.userTokenCheck, this.router, this.MemberAreaList)
        this.checkMessage.checkMessageDisplay('receiveMessage')
      }

      console.log('resultat nondd' ,this.parseTokenUser)

    })
  }

  resendVerificationCode() {
    this.userNameIdKefi = this.route.snapshot.paramMap.get('username');

    const formUsername = new UsernameResendCodeEmail(this.userNameIdKefi)
    this.user_http.resendVerifyCode(formUsername).pipe(catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe(result => {
    this.resendVerifyCodeMessage = result
      console.log("resend code" ,this.resendVerifyCodeMessage)
      if(this.resendVerifyCodeMessage.status === "email_resend"){
        this.emailResendOk = true
        setTimeout(()=>this.navigateToHomePage(), 5000)
      }else{
        this.emailResendOk = false


      }
    })
  }

  navigateToHomePage(){
    this.router.navigate(['/accueil'])
  }

}
