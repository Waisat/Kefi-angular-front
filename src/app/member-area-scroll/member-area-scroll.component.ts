import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {IdPublicPage} from "../class/id-public-page";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import ScrollTrigger from "gsap/ScrollTrigger";
import {ArrayMembersValuesToCheck} from "../class/array-members-values-to-check";
import {animate} from "@angular/animations";



@Component({
  selector: 'app-member-area-scroll',
  templateUrl: './member-area-scroll.component.html',
  styleUrls: ['./member-area-scroll.component.css']
})
export class MemberAreaScrollComponent implements OnInit, AfterViewInit {

  constructor(private publicServicePage: UserService) { }
  dataUsers:any =[]
  dataFilterUser:any;
  arrayMembers:any = []
  publicArrayFront: any;
  publicIdPush:any = [];
  scrollPosition:any
  departPoint:any
  requestArrayScroll:any = []
  lengthArrayUsers:any;
  stockUserArrayDisplay:any = []
  containerHeight:any;
  getLastElement:any;
  searchNameValue:any = [];
  checkForNameValue: boolean = false
  checkValidSearch:any
  noResult:any
  ngOnInit(): void {
    window.scroll(0, 0)
    this.getAllPublicIDUser()
    this.departPoint = 0
    this.scrollPosition = 8


  }
  ngAfterViewInit() {

    var lastValue = (this.stockUserArrayDisplay.length).toString()

/*
    ScrollTrigger.create({
      start:"top 80%",
      onLeave: (self) => this.dontInsertArray(this.scrollPosition , this.departPoint, this.lengthArrayUsers),
      onUpdate:(self) => console.log("rr",this.getLastElement)
    });

*/
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event:any) {

    if(window.pageYOffset >= this.containerHeight){
      this.dontInsertArray(this.scrollPosition , this.departPoint, this.lengthArrayUsers)
    }

    console.debug("Scroll Event", window.pageYOffset);
  }

  getAllPublicIDUser(){


      this.publicServicePage.getAllTheIdFromPublicProfile().pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      ).subscribe(result =>{
        this.dataUsers = result
        if(this.dataUsers.status_verify === "succeed"){
          for(let i =0; i < this.dataUsers.resultat.length; i++){

            this.arrayMembers.push(this.dataUsers.resultat[i].id)


          }

          this.lengthArrayUsers = this.arrayMembers.length
          this.dontInsertArray(this.scrollPosition , this.departPoint, this.lengthArrayUsers)
          console.log("dda",this.arrayMembers[0],this.arrayMembers[1], this.arrayMembers[3],this.arrayMembers[4] )
        }
        let getElementSize= document.getElementById("page_area")
          if(getElementSize){
            this.containerHeight =  (getElementSize.clientHeight)

          }


        //window.scroll(0, 0)

      })


  }

  dontInsertArray(scrollPosition:number, departPoint:number, lengthArray:number){
    this.requestArrayScroll = []
    let getElementSize= document.getElementById("page_area")
    if(getElementSize){

      this.containerHeight = (getElementSize.clientHeight)

    }
  console.log('current array', this.stockUserArrayDisplay)

    for(let b = departPoint; b <= scrollPosition -1; b++){
        if(this.arrayMembers.length !== 0 ){
          this.requestArrayScroll.push(this.arrayMembers[b])

        }else{
          return
        }

    }


    for(let c = departPoint; c <= scrollPosition -1; c++){
      if(this.arrayMembers.length !== 0){
        this.arrayMembers.unshift()
      }else {
        return
      }

    }

      this.scrollPosition = scrollPosition + 8
      this.departPoint = departPoint + 8
      console.log("hh", this.requestArrayScroll)
      this.publicArrayFront = new ArrayMembersValuesToCheck()
      this.publicArrayFront.publicArray = this.requestArrayScroll

      this.publicServicePage.omitIdFromPublicProfile(this.publicArrayFront).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      ).subscribe(result => {
        this.dataFilterUser = result
        console.log('this id push result', this.dataFilterUser)
        if (this.dataFilterUser.status_verify === "succeed") {
          console.log("stunt", this.dataFilterUser)
          for (let c = 0; c < this.dataFilterUser.resultat.length; c++) {
            this.stockUserArrayDisplay.push(this.dataFilterUser.resultat[c])
          }
          var minus = (this.stockUserArrayDisplay.length) - 1
          console.log("world", minus)
          this.getLastElement = document.getElementById("card-member-" + (this.stockUserArrayDisplay[minus].id).toString())
          console.log("world", this.getLastElement)
        }
        //window.scroll(0, 0)

      })



  }

  getEmitter(event:any){
    this.searchNameValue = []
    if(event.status_verify){


        for (let i = 0; i < event.reason.length; i++) {
          this.searchNameValue.push(event.reason[i])
          this.noResult = false
          this.checkForNameValue = true
          this.checkValidSearch = true
          console.log('found')
        }


    }else{
      console.log("check event", event.reason)
      if(event.reason === "not-found"){
        console.log('here')
        this.noResult = true
      }else if(event.reason === "failed") {
        this.checkValidSearch = false
        this.checkForNameValue = false

      }


    }

  }


}
