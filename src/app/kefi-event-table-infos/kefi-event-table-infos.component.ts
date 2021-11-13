import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kefi-event-table-infos',
  templateUrl: './kefi-event-table-infos.component.html',
  styleUrls: ['./kefi-event-table-infos.component.css']
})
export class KefiEventTableInfosComponent implements OnInit {
  @Input('eventD') public eventData:any
  public formatEventDate:string = ""
  constructor() { }

  ngOnInit(): void {
   const replaceT = this.eventData.event_date.replace("T", " ")
    const splitTable = replaceT.split(" ")
    this.formatEventDate = splitTable[0]
  }

}
