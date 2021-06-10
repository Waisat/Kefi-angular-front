import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {EventsService} from "../_services/events.service";
import {GetTokenArticleDetail} from "../class/get-token-article-detail";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private event:EventsService , private _routerParameter:ActivatedRoute) { }
  eventDetail: any;
  ngOnInit(): void {
    this.getDetailEvent()

  }



  getDetailEvent(){

    const getIdArticle = this._routerParameter.snapshot.paramMap.get('articleId')
    let putInsideClass = new GetTokenArticleDetail("")
    if(getIdArticle != null)
    putInsideClass.tokenArticle = getIdArticle.toString()
      console.log('this detail from article key', getIdArticle)
      this.event.getEventDetail(putInsideClass).pipe(catchError(err=>{
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })).subscribe((result=>{
        this.eventDetail = result
        console.log(result)
      }))



  }
}
