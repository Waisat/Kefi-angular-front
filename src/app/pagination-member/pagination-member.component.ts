import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommunicationPublicMemberListService} from "../_services/communication-public-member-list.service";

@Component({
  selector: 'app-pagination-member',
  templateUrl: './pagination-member.component.html',
  styleUrls: ['./pagination-member.component.css']
})
export class PaginationMemberComponent implements OnInit, OnChanges{
  @Input('navPagination') public pagination:any
  public navPagination: any =[]
  constructor(private _route: Router, private MemberPublicList: CommunicationPublicMemberListService) { }

  ngOnInit(): void {
    console.log("ttt",this.pagination)
    if(this.pagination !== undefined){
      //this.createPagination(this.pagination)

    }

  }

  ngOnChanges(changes: SimpleChanges) {
     console.log("pagination earth",changes.pagination.firstChange)
    if(!changes.pagination.firstChange){
      this.createPagination(this.pagination)
    }
  }


  createPagination(infoPagination:any){
    let valueIncrement = 0/*infoPagination.infoPagination*/
    console.log("hh",infoPagination.numbPage)
    for(let i = 1; i <=infoPagination.numbPage; i++){

      if(i !== infoPagination.numbPage){
        if(i === 1){
          const offsetVal = 0
          this.navPagination.push({page:i.toString(), limit:infoPagination.limit.toString(), offset:offsetVal.toString(),  option:infoPagination.option, job:infoPagination.job})
          valueIncrement= valueIncrement + 8
        }else{
          this.navPagination.push({page:i.toString(), limit:infoPagination.limit.toString(), offset:valueIncrement.toString(),  option:infoPagination.option, job:infoPagination.job})
          valueIncrement= valueIncrement + 8
        }
      }else{

        this.navPagination.push({page:i.toString(), limit:infoPagination.limit.toString(), offset:valueIncrement.toString(),  option:infoPagination.option, job:infoPagination.job})

      }
    }
    console.log('nav fgt', this.navPagination)
  }


  goPage(offset:any, limit:string, option:string, job:string, page:string){
    console.log("lune",offset)
    this._route.navigate([`/membres/offset_${offset}/limit_${limit}/search_${option}/job_${job}/page_${page}`])
    this.MemberPublicList.changeNavUrl({offsetUrl:offset, limitUrl:limit, option:option, job:job, page:page})

  }
}
