import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headers: any= []
  config:any= []
  buttonAboutSection:any
  sectionAboutUs:any
  constructor(private servicesUser:UserService) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    //this.showConfigResponse()

  }

}
