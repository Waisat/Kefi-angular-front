import { Component, OnInit } from '@angular/core';
import {PasswordUser} from "../class/password-user";

@Component({
  selector: 'app-forget-password-link',
  templateUrl: './forget-password-link.component.html',
  styleUrls: ['./forget-password-link.component.css']
})
export class ForgetPasswordLinkComponent implements OnInit {
  patternPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  newPassword:PasswordUser = new PasswordUser("", "","")
  constructor() { }

  ngOnInit(): void {
  }

  confirmPassword(): void{

  }

}
