import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Config} from "../interfaces/Config.interfaces";
import {User} from "../class/user.model";
import {CookieService} from "ngx-cookie";
import {JwtCookie} from "../class/jwtcookie";
import {UserTokenInterfaces} from "../interfaces/UserToken.interfaces";
import {MemberKefiInterfaces} from "../interfaces/MemberKefi.interfaces";
import {MemberToAddInterfaces} from "../interfaces/MemberToAdd.interfaces";
import {MemberToAdd} from "../class/member-to-add";
import {PasswordUser} from "../class/password-user";
import {VerifyEmailUrl} from "../class/verify-email-url";
import {FilterData} from "../class/filter-data";
import {EventKefi} from "../class/event-kefi";
import {EmailEventToSend} from "../class/email-event-to-send";
import {FormdataUser} from "../class/formdata-user";
import {GetAllPublicUsers} from "../class/get-all-public-users";
import {DetailUserPublicArea} from "../class/detail-user-public-area";
import {GetDomainNameClass} from "../class/get-domain-name-class";
import {SearchByName} from "../class/search-by-name";
import {FoundersPublicModel} from "../class/founders-public-model";
import {FounderDetailPublic} from "../class/founder-detail-public";
import {FormDataKefiUpdate} from "../class/form-data-kefi-update";
import {FormUpdateProfileUser} from "../class/form-update-profile-user";
import {ContactForm} from "../class/contact-form";
import {UsernameResendCodeEmail} from "../class/username-resend-code-email";
import {IdPublicPage} from "../class/id-public-page";
import {ArrayMembersValuesToCheck} from "../class/array-members-values-to-check";
import {Cgu} from "../class/cgu";
import {ForgetPassword} from "../class/forget-password";
@Injectable({
  providedIn: 'root'
})

export class UserService {

  ConfigUrl: string = "https://mysterious-reaches-96425.herokuapp.com"

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  options: object = {
    responseType: 'json',
  };
  optionFile: object = {
    responseType: 'json',
    dataType: "multipart/form-data",
    header: {'Access-Control-Allow-Origin': 'https://www.kefiassociation.fr'},
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  /*

  getPublicContent():Observable<HttpResponse<Config>>{
    return this.http.get<Config>(
      this.ConfigUrl +"/about", { observe: 'response' }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
*/
  /** POST: add a new hero to the database */
  LoginTo(user: User): Observable<User> {
    return this.http.post<User>(this.ConfigUrl + "/sign_in", user, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCookieJwt(key: string) {
    return !!this.cookieService.get(key);
  }

  getCookieValue(key: string) {
    return this.cookieService.get(key);
  }


  verifyCookieHeader(): Observable<UserTokenInterfaces[]> {
    return this.http.get<UserTokenInterfaces[]>(
      this.ConfigUrl + "/cookie_validity").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Get cookie User for verification ***/

  getCookie(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.ConfigUrl + "/admin_kefi", {observe: 'response'}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Get all members kefi from admin panel***/

  getAllMember(filterMember: FilterData): Observable<MemberKefiInterfaces[]> {
    return this.http.get<MemberKefiInterfaces[]>(
      this.ConfigUrl + `/member_list_kefi/search_${filterMember.specific}/order_${filterMember.order}/option_${filterMember.option}/page_${filterMember.page}/offset_${filterMember.offset}/limit_${filterMember.limit}/way_${filterMember.way}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Ajout nouveau membres Kefi ***/

  addNewMember(member: MemberToAdd): Observable<MemberToAdd> {
    return this.http.post<MemberToAdd>(this.ConfigUrl + "/add_members", member, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyEmail(dataUser: VerifyEmailUrl): Observable<VerifyEmailUrl[]> {
    return this.http.get<VerifyEmailUrl[]>(
      this.ConfigUrl + `/email_verification/${dataUser.user_name}/${dataUser.urlToken}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  /*** Button resend email for verification  ***/
  resendVerifyCode(username: UsernameResendCodeEmail): Observable<UsernameResendCodeEmail> {
    return this.http.post<UsernameResendCodeEmail>(this.ConfigUrl + "/resend_verification_code_email", username, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }
  /*** Update password member***/

  updatePasswordMember(passwordModel: PasswordUser): Observable<PasswordUser> {
    return this.http.post<PasswordUser>(this.ConfigUrl + "/update_password", passwordModel, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** Ajout d'evenement à partir du panel admin***/

  sendPhotoEvent(photo: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.ConfigUrl + "/send_photo_server", photo, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  addEventDb(event: EventKefi): Observable<EventKefi> {

    return this.http.post<EventKefi>(this.ConfigUrl + "/create_event", event, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendEmailToUsersForEvents(eventSendMail: EmailEventToSend): Observable<EmailEventToSend> {

    return this.http.post<EmailEventToSend>(this.ConfigUrl + "/send_email_To_users_options", eventSendMail, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** Photo user ajouté au serveur et updates des informations First Connection ***/

  sendPhotoUser(photoUser: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.ConfigUrl + "/api/upload", photoUser, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** updateData utilisateurs ***/

  updateDataToDb(updateInfosUser: FormdataUser): Observable<FormdataUser> {
    return this.http.post<FormdataUser>(this.ConfigUrl + "/update_infos_user", updateInfosUser, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }


  /*** Obtenir tout les utilisateurs page visiteurs ***/

  requestAllUsers(querySearch: GetAllPublicUsers): Observable<GetAllPublicUsers> {
    return this.http.get<GetAllPublicUsers>(
      this.ConfigUrl + `/all_member_public_profile/${querySearch.offset}/${querySearch.limit}/${querySearch.search_options}/${querySearch.job}/${querySearch.page}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Request detail user from public area***/
  getUserPublicData(queryUrl: DetailUserPublicArea): Observable<DetailUserPublicArea> {
    return this.http.get<DetailUserPublicArea>(
      this.ConfigUrl + `/membre_access_public/${queryUrl}`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllDomainPublic(): Observable<GetDomainNameClass> {
    return this.http.get<GetDomainNameClass>(this.ConfigUrl + `/getDomainName/all`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Specific search domain Job***/
  getJobDomainNamePublic(queryUrl: GetDomainNameClass): Observable<GetDomainNameClass> {
    return this.http.get<GetDomainNameClass>(this.ConfigUrl + `/getDomainName/${queryUrl.domain}`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Search query by name public visit, first name **/
  getUserBySearchName(searchName: SearchByName): Observable<SearchByName> {
    return this.http.post<SearchByName>(this.ConfigUrl + "/get_specific_user_search_box", searchName, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** obtenir tout les fondateurs public page ***/
  getAllFoundersPublicPage(): Observable<FoundersPublicModel> {
    return this.http.get<FoundersPublicModel>(this.ConfigUrl + `/fondateurs/all`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  /*** obtenir datail fondateur public page ***/
  getFounderDetailPublic(name:string): Observable<FounderDetailPublic> {
    return this.http.get<FounderDetailPublic>(this.ConfigUrl + `/fondateur/${name}`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Destroy previous photo profil from kefi user panel***/


  destroyPrevious(FormPhotoUser: FormDataKefiUpdate): Observable<FormDataKefiUpdate> {

    return this.http.post<FormDataKefiUpdate>(this.ConfigUrl + "/update_photo_profil_kefi_member", FormPhotoUser, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** Update DB user kefi from panel kefi member***/
  updateDataMemberKefi(FormDataUser: FormUpdateProfileUser): Observable<FormUpdateProfileUser> {

    return this.http.post<FormUpdateProfileUser>(this.ConfigUrl + "/update_kefi_data", FormDataUser, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*** Send  a message contact form Public***/

  sendAMessage(formContact: ContactForm): Observable<ContactForm> {

    return this.http.post<ContactForm>(this.ConfigUrl + "/contact_form_kefi", formContact, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAllTheIdFromPublicProfile(): Observable<IdPublicPage>{
    return this.http.get<IdPublicPage>(this.ConfigUrl + `/member_get_scroll_loading`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  /*** Get member by scroll***/
  omitIdFromPublicProfile(arrayValues:IdPublicPage): Observable<IdPublicPage>{
    return this.http.post<IdPublicPage>(this.ConfigUrl + `/member_get_scroll_omit`, arrayValues
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
/*** CGU***/
  getCguFromDb():Observable<Cgu>{
    return this.http.get<Cgu>(this.ConfigUrl + `/cgu_kefi_association`
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** Forget password user***/

  iForgotMyPassword(email:ForgetPassword):Observable<ForgetPassword>{
    return this.http.post<ForgetPassword>(this.ConfigUrl + '/forget_my_password', email).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*** check url befor showing confirm page***/


  checkUrlBeforePasswordChange(dataUser: VerifyEmailUrl): Observable<VerifyEmailUrl[]> {
    return this.http.get<VerifyEmailUrl[]>(
      this.ConfigUrl + `/nouveau_mot_de_passe/${dataUser.user_name}/${dataUser.urlToken}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}
