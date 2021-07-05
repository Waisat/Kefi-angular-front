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
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  patternPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  private emailUserVerify: any
  constructor(private user_http: UserService,  private route: ActivatedRoute, private router: Router, private cookieService:CookieService, private MemberAreaList: MemberAreaCommunicationService ) { }
  UserPassword: PasswordUser = new PasswordUser("","", "")
  emailVerification: VerifyEmailUrl = new VerifyEmailUrl("","")
  tokenUser: any;
  parseTokenUser:any;
  userTokenCheck:any = []
  IsWait:boolean = true
  ngOnInit(): void {
    const usernameId = this.route.snapshot.paramMap.get('username');
    const tokenVerifyMail = this.route.snapshot.paramMap.get('token');
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
      this.emailUserVerify  = result
      console.log('this email log', this.emailUserVerify)
    })
  }

  passwordConfirmation(){
    this.UserPassword.email = this.emailUserVerify
    this.user_http.updatePasswordMember(this.UserPassword).pipe(
      catchError(err => {

        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result =>{
      this.tokenUser = result
      this.parseTokenUser = JSON.parse(this.tokenUser)
      this.cookieService.put(this.parseTokenUser.name, this.parseTokenUser.jwt, {domain:"localhost", expires: new Date(Date.now() + 100000*3),})
      const token = this.user_http.getCookieJwt("kefi_token")
      if(token){
        this.IsWait = false
        CheckToken(this.user_http, this.IsWait, this.userTokenCheck, this.router, this.MemberAreaList)
      }

      console.log('resultat nondd' ,this.parseTokenUser)

    })
  }

}
