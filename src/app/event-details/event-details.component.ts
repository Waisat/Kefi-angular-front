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
  errorEventDetailUrl:any
  constructor(private event:EventsService , private _routerParameter:ActivatedRoute) { }
  eventDetail: any;
  widthCarousel:any;
  heightCarousel:any;

  imagesEventCarousel = [

    {path: 'assets/1.jpg'},
    {path: 'assets/2.jpg'},
    {path:'assets/3.jpg'}
    ]
  ngOnInit(): void {
    this.getDetailEvent()
    this.getCarouselSize()
  }


  getCarouselSize(){
    this.widthCarousel = window.screen.width

    if(this.widthCarousel < 500){
      this.widthCarousel = 300
      this.heightCarousel = 500
    }else{
      this.heightCarousel = 1000
    }


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
        if(this.eventDetail.status === "failed"){
          this.errorEventDetailUrl = true
        }
        console.log(result)
      }))



  }
}
