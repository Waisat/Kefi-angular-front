import { Component, OnInit } from '@angular/core';
import {User} from "../../class/user.model";
import {MemberToAddInterfaces} from "../../interfaces/MemberToAdd.interfaces";
import {MemberToAdd} from "../../class/member-to-add";
import {UserService} from "../../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-form-add-member',
  templateUrl: './form-add-member.component.html',
  styleUrls: ['./form-add-member.component.css']
})
export class FormAddMemberComponent implements OnInit {
  emailPattern:RegExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  UserAddModel:MemberToAdd= new MemberToAdd("","", "", "", "")
  userInsert:boolean = false;
  displayingMessage:any
  constructor(private userHttp : UserService) { }

  ngOnInit(): void {

  }
  addMemberToDB(){
    console.log(this.UserAddModel.name)


    this.userHttp.addNewMember(this.UserAddModel).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
    if(result){
      this.userInsert = true
      this.displayingMessage = true
      setTimeout(()=>this.displayingMessageFunc, 3000)
      console.log(result)
    }
    })

  }

  displayingMessageFunc(){
    this.displayingMessage = false
  }
}
