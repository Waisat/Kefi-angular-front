import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpJsonLocalService} from "../_services/http-json-local.service";
import {FormBuilder, FormControl,  FormGroup} from '@angular/forms';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {JobFormControl} from "../interfaces/job-form-control";
import {FormdataUser} from "../class/formdata-user";

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit, AfterViewInit {

    constructor(private formBuilder: FormBuilder, private http: HttpJsonLocalService) { }
  JsonJobData: any
  jobControl = new FormControl();
  JsonJobInterface: JobFormControl[] = []
  newFormModel = new FormdataUser("", "", "", "", "", "", "","", "","",true,true)
  form = new FormGroup({
    group: new FormControl(),
  });
  ngOnInit(): void {
    //Initialisation de la data concernants les métiers pour le formulaire d'entrer


  }

  ngAfterViewInit() {
    this.getDataJson()

  }

  changeDomaine(){
    alert("hello")
  }

  getDataJson(){
    this.http.getJobJson().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe((result=>{
      this.JsonJobData = result

      console.log('result all events', this.JsonJobInterface)
    }))
  }


  updateDataUser(){

  }

}
