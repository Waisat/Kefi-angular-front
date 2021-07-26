import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../class/user.model";
import {UserService} from "../_services/user.service";
import { CookieService } from 'ngx-cookie';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {LoginService} from "../_services/login-info.service";
import {Router} from "@angular/router";
import {UserTokenInterfaces} from "../interfaces/UserToken.interfaces";
import {CheckToken} from "../_utilities/CheckToken";
import {MemberAreaCommunicationService} from "../_services/member-area-communication.service";
import {CommunicationPublicMemberListService} from "../_services/communication-public-member-list.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Input('state') public data:any
  @Output() public childConnexionEvent = new EventEmitter()
  myData: any;
  emailPattern:RegExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  verifForm:boolean =false
  IsWait:boolean = false
  constructor(private user:UserService, private cookieService: CookieService, private loginService: LoginService, private _router: Router, private MemberAreaList: MemberAreaCommunicationService, private checkMessage: CommunicationPublicMemberListService) { }
  UserLoginModel:User= new User("","")
  userArray: any= []
  userToken: any = []
  ngOnInit(): void {
    console.log(history.state.data)
  }

  Login(): void{
    let userLoginInfo: any=[]
    this.IsWait = true

      this.user.LoginTo(this.UserLoginModel).pipe(
        catchError(err => {
          this.IsWait = false
          console.log('Handling error locally and rethrowing it...', err);
          this.checkMessage.checkMessageDisplay('error')
          return throwError(err);
        })
      ).subscribe(user => {
        this.userArray.push(user)
        userLoginInfo = JSON.parse(this.userArray)
        this.cookieService.put(userLoginInfo.name, userLoginInfo.jwt, {domain:"https://radiant-crag-76180.herokuapp.com/login",  sameSite:"none", secure:true, expires: new Date(Date.now() + 100000*8)})
        const token = this.user.getCookieJwt("kefi_token")
        if(token){
          this.IsWait = false
          history.pushState({data: {Info:true}}, '', '');
          //this.parentCommunication()
          this.updateData(true)
         CheckToken(this.user, this.IsWait, this.userToken, this._router, this.MemberAreaList)

          this.checkMessage.checkMessageDisplay('receiveMessage')

          console.log(token)
        }

      });

  }



  parentCommunication(){
    this.childConnexionEvent.emit(true)
  }

  updateData(value: boolean) {
    this.loginService.updateData(value);
  }



}
