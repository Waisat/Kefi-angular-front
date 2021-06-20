import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpJsonLocalService} from "../_services/http-json-local.service";
import {FormBuilder, FormControl,  FormGroup} from '@angular/forms';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {JobFormControl} from "../interfaces/job-form-control";
import {FormdataUser} from "../class/formdata-user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit, AfterViewInit {

    constructor(private formBuilder: FormBuilder, private http: HttpJsonLocalService, private user: UserService) { }
  @Input('userId') public userId:any
  JsonJobData: any
  jobControl = new FormControl();
  JsonJobInterface: JobFormControl[] = []
  newFormModel = new FormdataUser("", "", "", "", "", "", {networkExpenssion:false, getSomeContract:false, findpartners:false, pitchProject:false, other:false},"", "","",1,1)
  form = new FormGroup({
    group: new FormControl(),
  });
  regexLinkedin:RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
  photoProfile:any;


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

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      let date = new Date()
      let day = date.getDay()
      let month= date.getMonth() + 1
      let year = date.getFullYear()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let dateNow = `${year}_${month}_${day}_${hour}_${minute}_${second}`
      this.photoProfile  = event.target.files[0];
      this.newFormModel.photoUrl = `kef_photo_user_${this.userId}_${dateNow}.jpeg`

      console.log(this.userId)

      //this.uploadForm.get('profile').setValue(file);
      console.log('this photo name profile user', this.newFormModel.photoUrl)


    }else{
      return
    }
  }

  sendPhotoUser(photo:any){
    this.user.sendPhotoUser(photo).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })

  }

  updateDataUser(){
    const formData = new FormData()
    formData.append("file", this.photoProfile, this.newFormModel.photoUrl)
    this.sendPhotoUser(formData)
    this.user.updateDataToDb(this.newFormModel).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })

  }



}
