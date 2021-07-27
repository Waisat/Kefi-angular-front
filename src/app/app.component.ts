import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "./_services/user.service";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "./_utilities/animation";
import {MemberAreaCommunicationService} from "./_services/member-area-communication.service";
import {LoginService} from "./_services/login-info.service";
import {CommunicationPublicMemberListService} from "./_services/communication-public-member-list.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'kefi-angular-front';
  headersTokenResponse: any = [];
  public roleUserInfo: any = [];

  public connect:boolean=false
  public messageDisplay:any
  constructor(private userService: UserService, private MemberAreaList: MemberAreaCommunicationService, private displayMessaging: CommunicationPublicMemberListService) {
  }
  ngOnInit():void {

    let checkTokenExist = this.verifyIfExistToken()
    if(checkTokenExist){
      this.verifyIfValidToken()
      console.log('headercdedg;', this.headersTokenResponse)
      if(this.roleUserInfo.length +1 === 1){
        this.connect = true


        console.log('obj',this.roleUserInfo)
      }

      //console.log('connect test', this.roleUserInfo)

    }else{
      this.MemberAreaList.changeNavUrl("logout")
    }

  }

  ngAfterViewInit() {

    this.displayMessaging.messageToCheck.subscribe(infosNav =>this.messageDisplay = infosNav)
    this.timeOutToken()
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  /*** Verification si le token existe ***/
  verifyIfExistToken():boolean{

   return this.userService.getCookieJwt('kefi_token')

  }
  /*** Verification si le token est valide ***/
  verifyIfValidToken(): void{
  this.userService.verifyCookieHeader().pipe( catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
    this.MemberAreaList.changeNavUrl("logout")
      return throwError(err);
    })).subscribe(res=>{
      this.roleUserInfo = res
    console.log('test', this.roleUserInfo)
    if(this.roleUserInfo.userLevel === "membre"){
      this.MemberAreaList.changeNavUrl("membre")
    }else if(this.roleUserInfo.userLevel === "admin"){
      this.MemberAreaList.changeNavUrl("admin")
    }


  }

    )
    console.log(this.roleUserInfo)
  }

  timeOutToken(){
    console.log('tokkendnq')
    setInterval(()=>this.callTheTokenInterval, 1000)
  }

  callTheTokenInterval(){
    let TokenExist = this.verifyIfExistToken()
    console.log('coenddk', TokenExist)
    if(TokenExist){
      this.verifyIfValidToken()

      if(this.roleUserInfo.length +1 === 1){
        this.connect = true


        console.log('obj',this.roleUserInfo)
      }

      //console.log('connect test', this.roleUserInfo)

    }else{
      console.log('trz')
      this.MemberAreaList.changeNavUrl("logout")
    }

  }

}
