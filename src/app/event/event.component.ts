import { Component, OnInit } from '@angular/core';
import {EventsService} from "../_services/events.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventsKefi:any
  urlSite: string = environment.API_URL
  photosEvents:any
  constructor(private events: EventsService ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.getEventData()
  }
  getEventData(){
    this.events.getEvents().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe((result=>{
      this.eventsKefi = result

    }))

  }

}
