import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../_services/login-info.service";
import {LoginPageComponent} from "../login-page/login-page.component";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input('loginCheck') public Info:any
  @Input('userInfo') public UserLogInfo: any

  public verifyConnexion:any
  public myData:any
  constructor(private router: Router, private loginService: LoginService, private cookie: CookieService, private _route: Router) { }
  transferInfoConnexion:any

  ngOnInit(): void {
  this.transferInfoConnexion = this.Info
    this.getDataLoginService()
    this.verifyConnexion = this.UserLogInfo
    let verificationOfRole = this.verifyAdmin(this.verifyConnexion)
    console.log('this verif', this.verifyConnexion)

  }

  getDataLoginService(){
    this.loginService.getData().subscribe(data => {
      this.myData = data;
      console.log('this data log', data)
    })
  }

  verifyAdmin(verifyRole:string):Boolean{
  return verifyRole === 'admin'
  }

  logOut(){
    this.cookie.remove("kefi_token")
    this._route.navigate(['/accueil']).then(() => {
      window.location.reload();
    });
  }

}
