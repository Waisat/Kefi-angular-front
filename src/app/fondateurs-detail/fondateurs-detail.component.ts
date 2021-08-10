import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-fondateurs-detail',
  templateUrl: './fondateurs-detail.component.html',
  styleUrls: ['./fondateurs-detail.component.css']
})
export class FondateursDetailComponent implements OnInit {
  founderDetail_response: any;
  constructor(private founder: UserService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.getFounderInfo()
  }

  getFounderInfo(){
    const name = this._route.snapshot.params.name
    console.log("this jl name", name)
    this.founder.getFounderDetailPublic(name).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe((result=>{
      this.founderDetail_response = result
      console.log("boomka",this.founderDetail_response)
    }))
  }


}
