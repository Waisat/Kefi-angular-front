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
  constructor(private servicesUser:UserService) { }

  ngOnInit(): void {
    this.showConfigResponse()

  }

  showConfigResponse() {
    this.servicesUser.getPublicContent()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
        console.log(this.config.message)
      });
  }
}
