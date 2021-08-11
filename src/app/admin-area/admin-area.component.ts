import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {Router, Routes} from '@angular/router';
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {JwtCookie} from "../class/jwtcookie";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  tokenUser: any;
  constructor(private user: UserService, private cookieKefi: CookieService, private _router: Router) { }

  ngOnInit(): void {
  this.getRequestCookie()

  }



  getCookie(){
    const tokenExist: boolean = this.user.getCookieJwt("kefi_token")
    const token: string = this.user.getCookieValue("kefi_token")
    return [tokenExist, token]
  }


  sendCookieToServer(tokenExist:boolean, token_user:JwtCookie){
    if(tokenExist){
      //this.getRequestCookie()
      console.log('this', token_user)
    }else{
    // redirect
    }

  }

  /*** Envoi de la requête au servers aprés vérification du token ***/

  getRequestCookie(){

    this.user.getCookie().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.cookieKefi.remove('kefi_token', {domain:'kefiassociation.fr'});
        this._router.navigate(['/login'])
        return throwError(err);
      })
    ).subscribe(res =>{
      this.tokenUser = res.body
      if(this.tokenUser.role === 'admin'){
        console.log(this.tokenUser)
      }else if(this.tokenUser.role === undefined){
        this._router.navigate(['/espace_membre'])
      }

    }  , error =>{
      this.cookieKefi.remove('kefi_token', {domain:'kefiassociation.fr'});
        this._router.navigate(['/login'])
    }
    )
  }

}
