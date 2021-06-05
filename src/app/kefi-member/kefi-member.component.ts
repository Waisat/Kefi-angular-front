import { Component, OnInit } from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-kefi-member',
  templateUrl: './kefi-member.component.html',
  styleUrls: ['./kefi-member.component.css']
})
export class KefiMemberComponent implements OnInit {
  tokenUser:any;
  constructor(private user: UserService, private cookieKefi: CookieService, private _router: Router) { }

  ngOnInit(): void {
    this.getDataMember()
  }
  getDataMember(){
    console.log('tesdc')
    this.user.getCookie().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.cookieKefi.remove('kefi_token', {domain:'localhost'});
        this._router.navigate(['/login'])
        return throwError(err);
      })
    ).subscribe(res =>{
        this.tokenUser = res.body
        if(this.tokenUser.role === undefined){
          console.log("hi",this.tokenUser)
        }else if(this.tokenUser.role === "admin"){
          this._router.navigate(['/admin'])
        }

      }  , error =>{
        this.cookieKefi.remove('kefi_token', {domain:'localhost'});
        this._router.navigate(['/login'])
      }
    )
  }
}
