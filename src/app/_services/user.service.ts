import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Config} from "../interfaces/Config.interfaces";
import {User} from "../class/user.model";
import {CookieService} from "ngx-cookie";
import {JwtCookie} from "../class/jwtcookie";
import {UserTokenInterfaces} from "../interfaces/UserToken.interfaces";
import {MemberKefiInterfaces} from "../interfaces/MemberKefi.interfaces";
import {MemberToAddInterfaces} from "../interfaces/MemberToAdd.interfaces";
import {MemberToAdd} from "../class/member-to-add";
import {PasswordUser} from "../class/password-user";
import {VerifyEmailUrl} from "../class/verify-email-url";
import {FilterData} from "../class/filter-data";
@Injectable({
  providedIn: 'root'
})

export class UserService {

  ConfigUrl:string ="http://localhost:5000"
  constructor(private http: HttpClient, private cookieService:CookieService) { }
  options:object = {
    responseType: 'json',
  };
  optionFile:object={
    responseType: "multipart/form-data"
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getPublicContent():Observable<HttpResponse<Config>>{
    return this.http.get<Config>(
      this.ConfigUrl +"/about", { observe: 'response' }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** POST: add a new hero to the database */
  LoginTo(user: User): Observable<User> {
    return this.http.post<User>(this.ConfigUrl+"/sign_in", user, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCookieJwt(key:string){
    return !!this.cookieService.get(key);
  }
  getCookieValue(key:string){
    return this.cookieService.get(key);
  }


  verifyCookieHeader():Observable<UserTokenInterfaces[]>{
    return this.http.get<UserTokenInterfaces[]>(
      this.ConfigUrl +"/cookie_validity").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  /*** Get cookie User for verification ***/

  getCookie():Observable<HttpResponse<Config>>{
    return this.http.get<Config>(
      this.ConfigUrl +"/admin_kefi",{ observe: 'response' }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Get all members kefi from admin panel***/

  getAllMember(filterMember: FilterData):Observable<MemberKefiInterfaces[]>{
    return this.http.get<MemberKefiInterfaces[]>(
      this.ConfigUrl +`/member_list_kefi/search_${filterMember.specific}/order_${filterMember.order}/option_${filterMember.option}/page_${filterMember.page}/offset_${filterMember.offset}/limit_${filterMember.limit}/way_${filterMember.way}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Ajout nouveau membres Kefi ***/

  addNewMember(member: MemberToAdd): Observable<MemberToAdd> {
    return this.http.post<MemberToAdd>(this.ConfigUrl+"/add_members", member, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyEmail(dataUser:VerifyEmailUrl):Observable<VerifyEmailUrl[]>{
    return this.http.get<VerifyEmailUrl[]>(
      this.ConfigUrl +`/email_verification/${dataUser.user_name}/${dataUser.urlToken}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Update password member***/

  updatePasswordMember(passwordModel: PasswordUser): Observable<PasswordUser> {
    return this.http.post<PasswordUser>(this.ConfigUrl+"/update_password", passwordModel, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendPhotoEvent(photo: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.ConfigUrl+"/send_photo_server", photo,this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

}
