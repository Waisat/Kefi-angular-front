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

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'accueil', component: HomeComponent},
  { path: 'fondateurs', component: FondateursComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'evenements', component: EventComponent},
  {path: 'evenements/:articleId', component: EventDetailsComponent},
  {path:'admin', component:AdminAreaComponent, canActivate:[AuthGuard]},
  {path:'admin/member_list/:specific/:order/:option/:page/:offset/:limit/:way', component:MemberListComponent, canActivate:[AuthGuard]},
  {path:'admin/ajout_membre', component:AddMemberComponent, canActivate:[AuthGuard]},
  {path:'admin/creation_evenement', component:CreateEventComponent, canActivate:[AuthGuard]},
  {path:'membres', component:MemberAreaComponent},
  {path:'espace_membre', component:KefiMemberComponent, canActivate:[AuthGuard]},
  {path:'email_verification/:username/:token', component:EmailVerificationComponent},
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
