import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {UserService} from "../_services/user.service";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {CheckForFirstConnexionService} from "../_services/check-for-first-connexion.service";
import {FormdataUser} from "../class/formdata-user";
import {FormDataKefiUpdate} from "../class/form-data-kefi-update";
import {Form} from "@angular/forms";
import {FormUpdateProfileUser} from "../class/form-update-profile-user";
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {checkFields} from "../_utilities/verifyFields";

@Component({
  selector: 'app-kefi-member',
  templateUrl: './kefi-member.component.html',
  styleUrls: ['./kefi-member.component.css']
})
export class KefiMemberComponent implements OnInit, OnChanges, AfterViewInit {
  checkingStatsConnexionFirst:string = ""
  tokenUser:any;
  userName:string = ""
  parseLookingForInfos:any;
  photoProfile:any;
  photoChange:string= ""

  public checkChanges:boolean = false;
  public editToValid:boolean = false;
  public lookingForChoice: any;
  regexLinkedinMember: RegExp =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
  newFormModel:any;
  newImg:string =""
  checkIfEmailUpdate:any;
  defaultMenUrl: string = "";
  defaultWomanUrl: string = ""
  successDisplaySaveData: any;
  failedDisplaySaveData: any;
  updateKefiValidation:any
    /*
    =  new FormUpdateProfileUser("", "", "", "", "",  "","" , {networkExpenssion:false, getSomeContract:false, findpartners:false, pitchProject:false, other:false},"", "",1,1)
*/
  isChecked : boolean = true
  constructor(private user: UserService, private cookieKefi: CookieService, private _router: Router, private firstConnexionServices: CheckForFirstConnexionService) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.getDataMember()
    this.defaultMenUrl ="defaultman.png"
    this.defaultWomanUrl = "defaultwoman.png"
    this.firstConnexionServices.currentMessage.subscribe(infosConnexionFirst =>this.checkingStatsConnexionFirst = infosConnexionFirst)


  }
  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.getDataMember()
  }

  getDataMember(){
    this.user.getCookie().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.cookieKefi.remove('kefi_token', {domain:'kefiassociation.fr'});
        this._router.navigate(['/login'])


        return throwError(err);
      })
    ).subscribe(res =>{
        this.tokenUser = res.body
        if(this.tokenUser.role === undefined){
          console.log("hi",this.tokenUser)
          this.userName = this.tokenUser.user_name
          this.parseLookingForInfos = JSON.parse(this.tokenUser.looking_for)
          this.photoChange = this.tokenUser.photo_url
          console.log("test_user_inghov", this.parseLookingForInfos)
        }else if(this.tokenUser.role === "admin"){
          this._router.navigate(['/admin'])
        }

      }  , error =>{
        this.cookieKefi.remove('kefi_token', {domain:'kefiassociation.fr'});
        this._router.navigate(['/login'])
      }
    )
  }

  checkIfUpdateProfile(update:boolean){
    this.checkChanges = update
    if(this.checkChanges ){
      this.getDataMember()
      console.log("this changes ",this.checkChanges)
    }

  }
  /*** Edition à partir du paneau administrateur***/
  editFromPanel(){
    this.editToValid = true
    this.lookingForChoice = JSON.parse(this.tokenUser.looking_for)
    this.newFormModel = new FormUpdateProfileUser(this.tokenUser.city, this.tokenUser.postal_code, this.tokenUser.country, this.tokenUser.company, this.tokenUser.job,  this.tokenUser.domain_job,this.tokenUser.mobile , {networkExpenssion: this.parseLookingForInfos.networkExpenssion, getSomeContract: this.parseLookingForInfos.getSomeContract, findpartners: this.parseLookingForInfos.findpartners, pitchProject: this.parseLookingForInfos.pitchProject, other: this.parseLookingForInfos.other},this.tokenUser.description, this.tokenUser.linkedin,this.tokenUser.public_profil.toString(),this.tokenUser.news_letter.toString())

  }

 validFromPanel(){


    let checkFormDataUser = checkFields(this.newFormModel)
    if(checkFormDataUser){
      console.log(checkFormDataUser)
      this.user.updateDataMemberKefi(this.newFormModel).pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        }
      )).subscribe((result=>{
        this.updateKefiValidation = result
        if(this.updateKefiValidation.status === "success"){
          this.successDisplaySaveData = true
          setTimeout(()=> this.hiddenMessageTimeOut(), 5000)
        }else {
          this.failedDisplaySaveData = true
          setTimeout(()=> this.hiddenMessageTimeOut(), 5000)
        }

        this.getDataMember()
        console.log(result)
      }))
    }


    this.tokenUser.job = this.newFormModel.jobTitle
    this.tokenUser.jobDomain = this.newFormModel.subjectJob

    this.parseLookingForInfos = this.newFormModel.lookingFor
    this.tokenUser.mobile = this.newFormModel.mobile
    this.tokenUser.company = this.newFormModel.company
    this.tokenUser.public_profil = this.newFormModel.profileVisibility
    this.tokenUser.news_letter = this.newFormModel.consentNewsLetter
    this.tokenUser.linkedin = this.newFormModel.linkedin
    this.tokenUser.description = this.newFormModel.description
    this.editToValid = false
  }


  cancelFromPanel(){
    this.editToValid = false
  }

  checkCheckBoxvalue(event:any){
    console.log(event.checked)
  }

  onFileSelect(event:any){
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
      this.newImg = `kef_photo_user_${this.userName}_${dateNow}.jpeg`

      //this.uploadForm.get('profile').setValue(file);
      console.log('this photo name profile user from kefi member panel', this.newImg)

      const formData = new FormData()
      if(this.photoProfile && this.newImg){
        formData.append("file", this.photoProfile, this.newImg)
      }

      if(formData){
        console.log("test form data",formData)
        const formImagePreviousUrl = new FormDataKefiUpdate(this.tokenUser.photo_url, this.tokenUser.email, this.newImg )
        this.destroyImageFromServer(formImagePreviousUrl)
        this.sendPhotoUserUpdate(formData)


      }
    }else{
      return
    }
  }


  sendPhotoUserUpdate(formData:FormData){

    this.checkIfEmailUpdate = false
    this.user.sendPhotoUser(formData).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log("res",result)
      if(result){
        this.checkIfEmailUpdate = true
      }

      if(this.checkIfEmailUpdate){
        this.getDataMember()
        this.successDisplaySaveData = true
        setTimeout(()=> this.hiddenMessageTimeOut(), 3000)
      }else{
        this.failedDisplaySaveData = true
        setTimeout(()=> this.hiddenMessageTimeOut(), 3000)
        console.log('error to charge image')
      }

    })

    console.log(this.photoChange)
  }

  destroyImageFromServer(photo:FormDataKefiUpdate){
    this.user.destroyPrevious(photo).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    ).subscribe(result=>{
      console.log(result)
    })

  }

  hiddenMessageTimeOut(){
    this.successDisplaySaveData = false
    this.failedDisplaySaveData = false
  }

}
