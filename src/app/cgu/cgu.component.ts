import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css']
})
export class CguComponent implements OnInit {
  cguObj : any;
  cguText:string = ""
  noCGu:boolean = false
  constructor(private cgu: UserService) { }

  ngOnInit(): void {
    this.cguDisplay()
  }

  cguDisplay(){
    this.cgu.getCguFromDb().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe((result=>{
      this.cguObj = result
      if(this.cguObj.status  === "success"){
        console.log('sttt', this.cguObj )
        this.cguText = this.cguObj.info[0].cgu
      }else{
        this.noCGu = true
      }
    }))
  }

}
