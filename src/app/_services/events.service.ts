import { Injectable } from '@angular/core';
import {EventKefi} from "../class/event-kefi";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {GetTokenArticleDetail} from "../class/get-token-article-detail";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  ConfigUrl:string ="https://mysterious-reaches-96425.herokuapp.com/"
  options:object = {
    responseType: 'json',
  };
  optionFile:object={
    responseType: "multipart/form-data"
  }
  constructor(private http: HttpClient, private cookieService:CookieService) { }
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

  getEvents():Observable<EventKefi>{
    return this.http.get<EventKefi>(
      this.ConfigUrl +`/get_events`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getEventDetail(token:GetTokenArticleDetail):Observable<EventKefi>{
    return this.http.get<EventKefi>(
      this.ConfigUrl +`/get_detailEvent/${token.tokenArticle}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

}
