import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {GetDomainNameClass} from "../class/get-domain-name-class";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {SearchByName} from "../class/search-by-name";

@Component({
  selector: 'app-search-bar-member-area',
  templateUrl: './search-bar-member-area.component.html',
  styleUrls: ['./search-bar-member-area.component.css']
})
export class SearchBarMemberAreaComponent implements OnInit {
  @Input('urlInfo') public url:any
  @Output() public infoUrl = new EventEmitter()
  @Output() public searchNameInput = new EventEmitter()
  constructor(private domainUser:UserService, private _route: ActivatedRoute) { }
  public memberDomain: any
  public result_display:any
  public keysSorted:any
  public domainList:any
  public nbPage:any;
  public infosPage:any;
  public resultSearchName:any;
  public optionSearch:any = new SearchByName("")
  public autoFocusInput: any;
  ngOnInit(): void {
    /*
    this.getAllJobNameSelect()
    this.getQueryMemberSpecificJob()

     */


  }

  /*

  getAllJobNameSelect(){
    this.domainUser.getAllDomainPublic().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe((result=>{
      console.log("ress",result)

    this.result_display = result
      this.domainList = this.result_display[0]
      this.nbPage = this.result_display[1]
      console.log("nb ppahec", this.nbPage)
      const limitMax = 8
      let divide = this.nbPage / limitMax

      this.nbPage = Math.ceil(divide)
      let calArticleByPage = this.nbPage * limitMax
      let calDifference = calArticleByPage - this.nbPage
      let finalDifference = limitMax - calDifference

      this.infosPage ={  numbPage: this.nbPage, limit:limitMax, lastValue: finalDifference, limitPage:this.url.limit, offset:this.url.offset, option:this.url.search_options, job:this.url.job }
      this.infoUrl.emit(this.infosPage)
      console.log('should be ', this.infosPage)
    }))

  }

  getQueryMemberSpecificJob(){
   const searchDomain: GetDomainNameClass = this._route.snapshot.params.search
  this.domainUser.getJobDomainNamePublic(searchDomain).pipe(
    catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    })
  ).subscribe((result=>{
    this.memberDomain = result

  }))

  }
*/
  /*** Keydow Event pour la recherche **/

  keyDownSearch(){
    if(this.optionSearch.searchName !== ""){
      console.log(this.optionSearch.searchName)
      this.domainUser.getUserBySearchName(this.optionSearch).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      ).subscribe((result=>{
        this.resultSearchName = result
        if(this.resultSearchName.status_verify){
          this.searchNameInput.emit(this.resultSearchName)
          console.log("result search query name", this.resultSearchName)
        }else{
          this.searchNameInput.emit(this.resultSearchName)
          console.log("result search query error", this.resultSearchName)
        }

      }))
    }else{
      this.resultSearchName= {status_verify:false, reason:"failed"}
      this.searchNameInput.emit(this.resultSearchName)
    }

  }
}
