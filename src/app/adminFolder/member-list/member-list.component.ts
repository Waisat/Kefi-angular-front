import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {catchError} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {MemberKefiInterfaces} from "../../interfaces/MemberKefi.interfaces";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {FilterData} from "../../class/filter-data";
import {UtilitiesCheckService} from "../../_services/utilities-check.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private user_http: UserService, private route:ActivatedRoute, private dataPage: UtilitiesCheckService) { }
  dataMember:any;
  nbElement:any;
  nbPage:any;
  infosPage:any;
  dataUrlInfo:any;
  infoDataUser:any;
  checkForChangePage:boolean = false;
  ngOnInit(): void {
    this.getAllMembers()
  }



  checkUrlPosition(eventPagination:boolean){
    this.dataPage.getData().subscribe(data=>{
      console.log('dae',data)
      if(data){
        this.infoDataUser = data
        this.getAllMembers()
      }
    })


  }
  getAllMembers(){
    let specific: string = this.route.snapshot.params.specific;
    let order: string = this.route.snapshot.params.order;
    let option: string = this.route.snapshot.params.option;
    let page: string = this.route.snapshot.params.page;
    let offset: string = this.route.snapshot.params.offset;
    let limit: string = this.route.snapshot.params.limit;
    let way: string = this.route.snapshot.params.way;
    let replaceSpecific:string = specific.replace("_", " ")
    let replaceOrder:string = order.replace("_", " ")
    let replaceOption:string = option.replace("_", " ")
    let replacePage:string = page.replace("_", " ")
    let replaceOffset:string = offset.replace("_", " ")
    let replaceLimit:string = limit.replace("_", " ")
    let replaceWay:string = way.replace("_", " ")
    let splitOrder:any = replaceOrder.split(" ", 2)
    let splitSpecific:any = replaceSpecific.split(" ", 2)
    let splitOption:any = replaceOption.split(" ", 2)
    let splitPage:any = replacePage.split(" ", 2)
    let splitOffset:any = replaceOffset.split(" ", 2)
    let splitLimit:any = replaceLimit.split(" ", 2)
    let splitWay:any = replaceWay.split(" ", 2)

    let newForm = new FilterData("", "", "", "", "", "", "")
    newForm.specific = splitSpecific[1]
    newForm.order= splitOrder[1]
    newForm.option = splitOption[1]
    newForm.page = splitPage[1]
    newForm.offset = splitOffset[1]
    newForm.limit = splitLimit[1]
    newForm.way = splitWay[1]

    //const url: string = this.route.snapshot.url.join('');
    console.log("hello",newForm)
    this.user_http.getAllMember(newForm).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result =>{
      this.dataMember = result[0]
      this.nbElement= result[1]
      this.dataUrlInfo = result[2]
      console.log('dact',this.dataUrlInfo)
      const limitMax = 10
      let divideNumber = this.nbElement / limitMax

      this.nbPage = Math.ceil(divideNumber)
      let calArticleByPage = this.nbPage * limitMax
      let calDifference = calArticleByPage - this.nbElement
      let finalDifference = limitMax - calDifference
      this.infosPage ={numbPage: this.nbPage, limit:limitMax, lastValue: finalDifference, specific:this.dataUrlInfo.specific, order:this.dataUrlInfo.order, option:this.dataUrlInfo.option, way:this.dataUrlInfo.way }
      console.log('should be ', this.infosPage)
    } )
  }





}
