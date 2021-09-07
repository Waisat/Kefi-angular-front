import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {MemberAreaComponent} from "./member-area/member-area.component";
import {AuthGuard} from "./auth.guard";
import {AdminAreaComponent} from "./admin-area/admin-area.component";
import {KefiMemberComponent} from "./kefi-member/kefi-member.component";
import {MemberListComponent} from "./adminFolder/member-list/member-list.component";
import {AddMemberComponent} from "./adminFolder/add-member/add-member.component";
import {EmailVerificationComponent} from "./email-verification/email-verification.component";
import {FondateursComponent} from "./fondateurs/fondateurs.component";
import {ContactComponent} from "./contact/contact.component";
import {ArticlesComponent} from "./articles/articles.component";
import {EventComponent} from "./event/event.component";
import {CreateEventComponent} from "./adminFolder/create-event/create-event.component";
import {EventDetailsComponent} from "./event-details/event-details.component";
import {MembersAreaDetailComponent} from "./members-area-detail/members-area-detail.component";
import {FondateursDetailComponent} from "./fondateurs-detail/fondateurs-detail.component";
import {PayementSubcriptionComponent} from "./payement-subcription/payement-subcription.component";
import {MemberAreaScrollComponent} from "./member-area-scroll/member-area-scroll.component";
import {CguComponent} from "./cgu/cgu.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'accueil', component: HomeComponent, data: {animation: 'HomePage'}},
  { path: 'fondateurs', component: FondateursComponent, data: {animation: 'FoundersPage'}},
  { path: 'fondateur/:name', component: FondateursDetailComponent, data: {animation: 'FoundersDetailPage'}},
  {path: 'login', component: LoginPageComponent ,data: {animation: 'LoginPage'}},
  {path: 'forgetPassword', component: ForgetPasswordComponent ,data: {animation: 'ForgetPasswordPage'}},
  {path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
  {path: 'conditions_generales_utilisation', component: CguComponent, data: {animation: 'CGUPage'}},
  {path: 'articles', component: ArticlesComponent, data: {animation: 'ArticlesPage'}},
  {path: 'evenements', component: EventComponent, data: {animation: 'EventPage'}},
  {path: 'evenements/:articleId', component: EventDetailsComponent, data:{ animation: 'EventPageDetail'}},
  {path:'admin', component:AdminAreaComponent, canActivate:[AuthGuard]},
  {path:'admin/member_list/:specific/:order/:option/:page/:offset/:limit/:way', component:MemberListComponent, canActivate:[AuthGuard]},
  {path:'admin/ajout_membre', component:AddMemberComponent, canActivate:[AuthGuard]},
  {path:'admin/creation_evenement', component:CreateEventComponent, canActivate:[AuthGuard]},
 // {path:'membres/:offset/:limit/:search/:job/:page', component:MemberAreaScrollComponent, data: {animation: 'MemberSearch'}},
  {path:'membres', component:MemberAreaScrollComponent, data: {animation: 'MemberSearch'}},
  {path:'membre/:slugUrl', component:MembersAreaDetailComponent, data: {animation: 'MemberAreaDetail'}},
  {path:'espace_membre', component:KefiMemberComponent, canActivate:[AuthGuard],  data: {animation: 'ZoneMemberPage'}},
  {path:'email_verification/:username/:token', component:EmailVerificationComponent},
  {path:'inscription', component:PayementSubcriptionComponent},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
