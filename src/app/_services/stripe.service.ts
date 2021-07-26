import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {Observable, throwError} from "rxjs";
import {User} from "../class/user.model";
import {catchError, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StripeServices {
  ConfigUrl: string = "http://localhost:5000"

  constructor(private http: HttpClient) {
  }

  options: object = {
    responseType: 'json',
  };
  optionFile: object = {
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
  stripePayment(){
    return this.http.post(`${this.ConfigUrl}/create-checkout-session`, {}, this.options)

  }

  /** POST: add a new hero to the database */

}
