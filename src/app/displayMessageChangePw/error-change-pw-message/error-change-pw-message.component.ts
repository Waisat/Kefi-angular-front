import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-change-pw-message',
  templateUrl: './error-change-pw-message.component.html',
  styleUrls: ['./error-change-pw-message.component.css']
})
export class ErrorChangePwMessageComponent implements OnInit {
  @Input('dataError') public data:any
  constructor() { }

  ngOnInit(): void {
  }

}
