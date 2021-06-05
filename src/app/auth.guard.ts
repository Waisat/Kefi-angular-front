import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "./_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
public checkCook:any = []
role:any = []
  constructor(private _authUser : UserService, private _router: Router) {
  }

  canActivate(): boolean{
    var userTest = this._authUser.getCookieJwt("kefi_token")

    console.log('end',this.checkCook)
      if(userTest){
       return true

      }else{
        this._router.navigate(['/login'])
        return false
      }
    }

  checkCookie():any{
  this._authUser.verifyCookieHeader() .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      ).subscribe(result =>{
        this.checkCook = result
     }

      )



  }

}

