import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "./_services/user.service";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'kefi-angular-front';
  headersTokenResponse: any = [];
  public roleUserInfo: any = [];

  public connect:boolean=false
  constructor(private userService: UserService) {
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

    }
  }



  /*** Verification si le token existe ***/
  verifyIfExistToken():boolean{

   return this.userService.getCookieJwt('kefi_token')

  }
  /*** Verification si le token est valide ***/
  verifyIfValidToken(): void{
  this.userService.verifyCookieHeader().pipe( catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })).subscribe(res=>{
      this.roleUserInfo = res
    console.log('test', this.roleUserInfo)

  }

    )
    console.log(this.roleUserInfo)
  }



}
