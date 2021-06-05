import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {
  @Input('UserToken') public userInfoFromToken: any
  constructor() { }

  ngOnInit(): void {


  }

}
