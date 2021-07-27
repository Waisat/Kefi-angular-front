import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {CookieService} from "ngx-cookie";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {GetAllPublicUsers} from "../class/get-all-public-users";
import {MemberAreaCommunicationService} from "../_services/member-area-communication.service";
import {TweenLite, TimelineMax, Linear, Back, Sine, gsap, TweenMax} from 'gsap/all'
import ScrollTrigger from "gsap/ScrollTrigger";
import {CommunicationPublicMemberListService} from "../_services/communication-public-member-list.service";

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private users: UserService, private MemberAreaList: MemberAreaCommunicationService, private route: ActivatedRoute, private communicationPage: CommunicationPublicMemberListService) { }
  infosMemberPage:any;
  public allUsers:any;
  public dataUsers:any;
  public transferUrl:any;
  public getDataNavPage:any = []
  public infoNavList:any
  public keepDataInfo:any;

  ngOnInit(): void {
    this.allUsers = new GetAllPublicUsers("", "","", "","")
    this.transferUrl = this.allUsers
    console.log("bent to it",this.allUsers)
    this.animateCardMembers()
    this.getAllUsers(this.infoNavList)
    this.communicationPage.currentMessage.subscribe(infosNav =>this.infosMemberPage = infosNav)
    //this.newSearchMember()
    this.communicationPage.currentMessage.subscribe(infosNav =>{
      this.infoNavList = infosNav
      console.log("hero", this.infoNavList)
      if(this.infoNavList){
        this.getAllUsers(this.infoNavList)
      }
    })



  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.infoNavList.currentValue){
      console.log('changeeee', this.infoNavList)
      this.getAllUsers(this.infoNavList)
    }
  }


  ngAfterViewInit() {


  }

  getEmitter(newItem:string){
    this.getDataNavPage = newItem
    console.log('test data page', this.getDataNavPage)
  }


  getAllUsers(infoNav: any ){
    console.log('value infoNav', infoNav)

    if(infoNav !== undefined){

      console.log("resposs",infoNav.page)
      this.allUsers.offset = infoNav.offsetUrl
      this.allUsers.limit = infoNav.limitUrl
      this.allUsers.search_options = "all"
      this.allUsers.job = "all"
      this.allUsers.page = infoNav.page
      console.log("respnseo",this.allUsers)

      if(this.allUsers.offset !== undefined){
        this.users.requestAllUsers(this.allUsers).pipe(
          catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
          })
        ).subscribe(result =>{
          console.log('elevated 55665',this.allUsers.offset)
          console.log("result data all member page 55",result)
          this.dataUsers = result
          window.scroll(0, 0)

        })
      }


    }else{

      let getOffset = this.route.snapshot.params.offset
      let getLimit = this.route.snapshot.params.limit
      let getSearch = this.route.snapshot.params.search
      let getJob = this.route.snapshot.params.job
      let getPage = this.route.snapshot.params.page
      console.log(getOffset, getLimit,getSearch, getJob, getPage )
      let removeSlashOffset = getOffset.replace("_", " ")
      let removeSlashLimit = getLimit.replace("_", " ")
      let removeSlashSearch = getSearch.replace("_", " ")
      let removeSlashJob = getJob.replace("_", " ")
      let removeSlashPage = getPage.replace("_", " ")
      let arrayDataOffset = removeSlashOffset.split(" ", 2 )
      let arrayDataFirstLimit = removeSlashLimit.split(" ", 2 )
      let arrayDataSearchQuery = removeSlashSearch.split(" ", 2 )
      let arrayDataJobQuery = removeSlashJob.split(" ", 2 )
      let arrayDataPageQuery = removeSlashPage.split(" ", 2 )
      console.log("space jam0", arrayDataOffset)
      console.log("offset + limit now ",arrayDataOffset, arrayDataFirstLimit)

      this.allUsers.offset = arrayDataOffset[1]
      this.allUsers.limit = arrayDataFirstLimit[1]
      this.allUsers.search_options = arrayDataSearchQuery[1]
      this.allUsers.job = arrayDataJobQuery[1]
      this.allUsers.page = arrayDataPageQuery[1]
      console.log("off",this.allUsers)

      this.users.requestAllUsers(this.allUsers).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      ).subscribe(result =>{
        console.log('elevated 55665',this.allUsers.offset)
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

  animateCardMembers(){
    var tl = new TimelineMax();
    const cardUser = document.getElementsByClassName('cardUsers')
    console.log("chikc", cardUser)
    tl.to(cardUser, {opacity:0, duration:5})
  }


}
