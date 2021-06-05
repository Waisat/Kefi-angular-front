import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-member',
  templateUrl: './table-member.component.html',
  styleUrls: ['./table-member.component.css']
})
export class TableMemberComponent implements OnInit {
@Input('getAllMembers') public getMembers:any
  constructor() { }

  ngOnInit(): void {
  }

}
