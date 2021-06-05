import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NavPageMemberList} from "../../class/nav-page-member-list";
import {Observable} from "rxjs";
import {CheckPaginationChange} from "../../class/check-pagination-change";
import {UtilitiesCheckService} from "../../_services/utilities-check.service";
import {PageMemberListUtilities} from "../../_utilities/PageMemberListUtilities";



@Component({
  selector: 'app-pagination-member-list',
  templateUrl: './pagination-member-list.component.html',
  styleUrls: ['./pagination-member-list.component.css']
})
export class PaginationMemberListComponent implements OnInit {
  constructor(private serviceUtilities:UtilitiesCheckService) { }
  @Input('getInfoForPAgination') public infoPagination: any
  @Output() newItemEvent: EventEmitter<boolean> = new EventEmitter();
  navPagination:any=[]
  ngOnInit(): void {

    if(this.infoPagination !== undefined){
      this.createPagination(this.infoPagination)
      console.log('info pagination 88', this.navPagination)
    }


  }

 changePage() {
   PageMemberListUtilities(this.newItemEvent).then(result=>{
    if(result){
      console.log(result)
    }
   }).catch((reason => {
    console.log(reason)
   }))
   this.serviceUtilities.updateData(true)

  }




  async doThis(){
    await this.changePage();
    console.log('testing')
    this.newItemEvent.emit(true);
  }

  createPagination(infoPagination:any){
    let valueIncrement = 0/*infoPagination.infoPagination*/
    for(let i = 1; i <=infoPagination.numbPage; i++){

      if(i !== infoPagination.numbPage){
        if(i === 1){
          this.navPagination.push({page:i.toString(), limit:infoPagination.limit, offset:0, specific:infoPagination.specific, order: infoPagination.order, option:infoPagination.option, way:infoPagination.way})
            valueIncrement= valueIncrement + 10
        }else{
          this.navPagination.push({page:i.toString(), limit:infoPagination.limit, offset:valueIncrement, specific:infoPagination.specific, order: infoPagination.order, option:infoPagination.option, way:infoPagination.way})
          valueIncrement= valueIncrement + 10
        }

      }else{

        this.navPagination.push({page:i.toString(), limit:infoPagination.lastValue, offset:valueIncrement, specific:infoPagination.specific, order: infoPagination.order, option:infoPagination.option, way:infoPagination.way})

      }
    }
  }





}
