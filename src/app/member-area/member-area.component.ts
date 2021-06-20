import { Component, OnInit } from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {CookieService} from "ngx-cookie";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {GetAllPublicUsers} from "../class/get-all-public-users";
import {MemberAreaCommunicationService} from "../_services/member-area-communication.service";

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {
  infosMemberPage:any;
  constructor(private users: UserService, private MemberAreaList: MemberAreaCommunicationService, private route: ActivatedRoute) { }
  public allUsers = new GetAllPublicUsers("0", "10","all")
  public dataUsers:any;
  ngOnInit(): void {
    console.log("bent to it",this.allUsers)
    this.getAllUsers()
    this.MemberAreaList.currentMessage.subscribe(infosNav =>this.infosMemberPage = infosNav)
    this.newSearchMember()
  }



  getAllUsers(){
    console.log("respo",this.allUsers.offset)

    let getOffset = this.route.snapshot.params.offset
    let getLimit = this.route.snapshot.params.limit
    let getSearch = this.route.snapshot.params.search

    let removeSlashOffset = getOffset.replace("_", " ")
    let removeSlashLimit = getLimit.replace("_", " ")
    let removeSlashSearch = getSearch.replace("_", " ")
    let arrayDataOffset = removeSlashOffset.split(" ", 2 )
    let arrayDataFirstLimit = removeSlashLimit.split(" ", 2 )
    let arrayDataSearchQuery = removeSlashSearch.split(" ", 2 )
    console.log("space jam0", arrayDataOffset)
    if(getOffset === "offset_0"){

    this.users.requestAllUsers(this.allUsers).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result =>{
      console.log("result data all member page 65",result)
      this.dataUsers = result

    })
  }else{

      this.allUsers.offset = arrayDataOffset[1]
      this.allUsers.limit = arrayDataFirstLimit[1]
      this.allUsers.search_options = arrayDataSearchQuery[1]
    console.log("off",this.allUsers)
    this.users.requestAllUsers(this.allUsers).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result =>{
      console.log("result data all member page 55",result)
      this.dataUsers = result

    })
  }

  }

  newSearchMember(){
    this.MemberAreaList.changeNavUrl(this.allUsers)
  }


  getOptions(){

  }


}
