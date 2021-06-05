import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";

export function CheckToken(userService:UserService, isWait:boolean, userToken:any, _router:Router ){
  userService.verifyCookieHeader().pipe(
      catchError(err => {
        isWait = false
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(data =>{
      console.log('tyd', data)
      userToken.push(data)
      if( userToken[0].userLevel === 'membre'){
        _router.navigate(['/espace_membre']).then(() => {
          window.location.reload();
        });
        return userToken
      }else if( userToken[0].userLevel === 'admin'){
        _router.navigate(['/admin']).then(() => {
          window.location.reload();
        });
        return userToken
      }else{
        _router.navigate(['/login'])
        return undefined
      }
    })

}
