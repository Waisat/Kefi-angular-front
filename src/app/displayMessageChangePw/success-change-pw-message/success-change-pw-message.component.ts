import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-change-pw-message',
  templateUrl: './success-change-pw-message.component.html',
  styleUrls: ['./success-change-pw-message.component.css']
})
export class SuccessChangePwMessageComponent implements OnInit {
  @Input('dataPage') public data:any
  constructor() { }

  ngOnInit(): void {
  }

}
