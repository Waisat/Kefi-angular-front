import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userToken: UserService , private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(UserService)
    let tokenizedRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getCookieValue('kefi_token')}`
      }
    })
    return next.handle(tokenizedRequest)
  }

}
