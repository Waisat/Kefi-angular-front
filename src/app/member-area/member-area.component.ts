import { Component, OnInit } from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
