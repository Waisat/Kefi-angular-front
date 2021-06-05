import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { SpinnerComponent } from './spinner/spinner.component';
import {UserService} from "./_services/user.service";
import {AuthGuard} from "./auth.guard";
import { MemberAreaComponent } from './member-area/member-area.component';
import {LoginService} from "./_services/login-info.service";
import { AdminAreaComponent } from './admin-area/admin-area.component';
import {HttpInterceptor} from "@angular/common/http";
import {TokenInterceptorService} from "./_services/token-interceptor.service";
import { KefiMemberComponent } from './kefi-member/kefi-member.component';
import { SideBarComponent } from './adminFolder/side-bar/side-bar.component';
import { TableMemberComponent } from './adminFolder/table-member/table-member.component';
import { AdminProfilComponent } from './adminFolder/admin-profil/admin-profil.component';
import { MemberListComponent } from './adminFolder/member-list/member-list.component';
import { AddMemberComponent } from './adminFolder/add-member/add-member.component';
import { FormAddMemberComponent } from './adminFolder/form-add-member/form-add-member.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SearchNavMemberListComponent } from './adminFolder/search-nav-member-list/search-nav-member-list.component';
import { PaginationMemberListComponent } from './adminFolder/pagination-member-list/pagination-member-list.component';
import { FondateursComponent } from './fondateurs/fondateurs.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { AboutComponent } from './about/about.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { EventComponent } from './event/event.component';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { CreateEventComponent } from './adminFolder/create-event/create-event.component';
import { SearchBarMemberAreaComponent } from './search-bar-member-area/search-bar-member-area.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    SpinnerComponent,
    MemberAreaComponent,
    AdminAreaComponent,
    KefiMemberComponent,
    SideBarComponent,
    TableMemberComponent,
    AdminProfilComponent,
    MemberListComponent,
    AddMemberComponent,
    FormAddMemberComponent,
    EmailVerificationComponent,
    SearchNavMemberListComponent,
    PaginationMemberListComponent,
    FondateursComponent,
    ContactComponent,
    FooterComponent,
    ArticlesComponent,
    AboutComponent,
    ServicesHomeComponent,
    EventComponent,
    WelcomeModalComponent,
    CreateEventComponent,
    SearchBarMemberAreaComponent,

  ],


  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule

  ],
  providers: [UserService, AuthGuard, LoginService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
