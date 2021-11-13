import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Config} from "../interfaces/Config.interfaces";
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class HttpJsonLocalService {
  private localJobJson:string =`${environment.API_URL}/job.json`
  constructor(private http: HttpClient) { }

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

  getJobJson():Observable<any>{
    return this.http.get(
      this.localJobJson)
  }
}
