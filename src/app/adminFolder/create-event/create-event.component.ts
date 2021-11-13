import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {EventKefi} from "../../class/event-kefi";
import {UserService} from "../../_services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {FormDataGet} from "../../class/form-data";
import {EmailEventToSend} from "../../class/email-event-to-send";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  uploadForm:any= FormGroup;
  image:any = [];
  newImageFormatName:any
  constructor(private formBuilder: FormBuilder, private user: UserService) { }
  emailPattern:RegExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngModelEvent = new EventKefi("","","",[""],"","","","","", "", "", "", "", "", "")
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: [''],

    });
  }
  createEvent(){
    const formData = new FormData()
    const transformTitle = this.ngModelEvent.title.replace(/\s/g, '-')
    console.log(transformTitle)
    this.ngModelEvent.imageEvent.shift()
    for(let i =0; i < this.image.length; i++){
      const definitiveTitle = transformTitle +'_' +i + '.jpeg'
      this.ngModelEvent.imageEvent.push(definitiveTitle)

      formData.append("file", this.image[i], definitiveTitle)
    }
    this.ngModelEvent.folderName = transformTitle + '/'
    this.addNewEvent()
    if(this.ngModelEvent.send_MailTo === "verifyEmailUser" || this.ngModelEvent.send_MailTo ==="newsLetterSubscriber"){
      let ngSendMail = new EmailEventToSend("","","",[""],"","","","","","", "", "")
      ngSendMail.mailContact = this.ngModelEvent.mailContact
      ngSendMail.people_attend = this.ngModelEvent.people_attend
      ngSendMail.title = this.ngModelEvent.title
      ngSendMail.imageEvent = this.ngModelEvent.imageEvent
      ngSendMail.address = this.ngModelEvent.address
      ngSendMail.city = this.ngModelEvent.city
      ngSendMail.postal_code = this.ngModelEvent.postal_code
      ngSendMail.event_date = this.ngModelEvent.event_date
      ngSendMail.start_hours = this.ngModelEvent.start_hours
      ngSendMail.end_hours = this.ngModelEvent.end_hours
      ngSendMail.send_MailTo = this.ngModelEvent.send_MailTo
      ngSendMail.MessageToSend = this.ngModelEvent.MessageToSend
      this.sendEmailToUsers(ngSendMail)
    }

    console.log("this forms contains", this.ngModelEvent)
    this.postImage(formData)

    console.log(formData)
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
     // const file = event.target.files[0];
      //this.image  = file
      let files = []
      for(let i =0; i < event.target.files.length; i++ ){

          files.push(event.target.files[i])


      }
      this.image = files

      //this.uploadForm.get('profile').setValue(file);
      console.log('this upload', this.image[0])


    }else{
      return
    }
  }

  /*** Send image to the server ***/
  postImage(photo:any){
    this.user.sendPhotoEvent(photo).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })
  }

  sendEmailToUsers(modelMail:any){
    console.log("touch from floor", modelMail)
    this.user.sendEmailToUsersForEvents(modelMail).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })
  }

  addNewEvent(){
    this.user.addEventDb(this.ngModelEvent).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })
  }


}
