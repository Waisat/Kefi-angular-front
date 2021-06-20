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

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'accueil', component: HomeComponent, data: {animation: 'HomePage'}},
  { path: 'fondateurs', component: FondateursComponent, data: {animation: 'FoundersPage'}},
  {path: 'login', component: LoginPageComponent ,data: {animation: 'LoginPage'}},
  {path: 'contact', component: ContactComponent, data: {animation: 'ContactPage'}},
  {path: 'articles', component: ArticlesComponent, data: {animation: 'ArticlesPage'}},
  {path: 'evenements', component: EventComponent, data: {animation: 'EventPage'}},
  {path: 'evenements/:articleId', component: EventDetailsComponent},
  {path:'admin', component:AdminAreaComponent, canActivate:[AuthGuard]},
  {path:'admin/member_list/:specific/:order/:option/:page/:offset/:limit/:way', component:MemberListComponent, canActivate:[AuthGuard]},
  {path:'admin/ajout_membre', component:AddMemberComponent, canActivate:[AuthGuard]},
  {path:'admin/creation_evenement', component:CreateEventComponent, canActivate:[AuthGuard]},
  {path:'membres/:offset/:limit/:search', component:MemberAreaComponent, data: {animation: 'MemberSearch'}},
  {path:'membre/:slugUrl', component:MembersAreaDetailComponent, data: {animation: 'MemberAreaDetail'}},
  {path:'espace_membre', component:KefiMemberComponent, canActivate:[AuthGuard]},
  {path:'email_verification/:username/:token', component:EmailVerificationComponent},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
