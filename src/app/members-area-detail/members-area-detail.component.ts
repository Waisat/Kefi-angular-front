import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../_services/user.service";
import {DetailUserPublicArea} from "../class/detail-user-public-area";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-members-area-detail',
  templateUrl: './members-area-detail.component.html',
  styleUrls: ['./members-area-detail.component.css']
})
export class MembersAreaDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private user: UserService ){ }
  public dataUser: any
  public parseLookingForInfos: any
  ngOnInit(): void {
    this.getDetailMemberPublic()
  }

  getDetailMemberPublic() {
    const urlSnap: DetailUserPublicArea = this.route.snapshot.params.slugUrl

    this.user.getUserPublicData(urlSnap).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result => {
        console.log("result data member 65", result)
        this.dataUser = result
        this.parseLookingForInfos = JSON.parse(this.dataUser[0].looking_for)
        console.log("parse", this.parseLookingForInfos)
      }
    )
  }
}