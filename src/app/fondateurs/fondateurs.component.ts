import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {FoundersPublicModel} from "../class/founders-public-model";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-fondateurs',
  templateUrl: './fondateurs.component.html',
  styleUrls: ['./fondateurs.component.css']
})
export class FondateursComponent implements OnInit {

  constructor(private foundersPublic: UserService) { }
  allFounders: any;
  ngOnInit(): void {
    this.displayAllFounders()

  }

  displayAllFounders(){
   this.foundersPublic.getAllFoundersPublicPage().pipe(
     catchError(err => {
       console.log('Handling error locally and rethrowing it...', err);
       return throwError(err);
     })
   ).subscribe((result=>{
     this.allFounders = result
     console.log("boom",this.allFounders)
   }))
  }

}
