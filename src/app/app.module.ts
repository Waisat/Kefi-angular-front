import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
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
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SpinnerComponent } from './spinner/spinner.component';
import {UserService} from "./_services/user.service";
import {EventsService} from "./_services/events.service";
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
import { EventDetailsComponent } from './event-details/event-details.component';
import { KefiEventTableInfosComponent } from './kefi-event-table-infos/kefi-event-table-infos.component';
import { ButtonsParticipationEventComponent } from './buttons-participation-event/buttons-participation-event.component';
import { CommentsEventsSectionComponent } from './comments-events-section/comments-events-section.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import { MembersAreaDetailComponent } from './members-area-detail/members-area-detail.component';
import { PaginationMemberComponent } from './pagination-member/pagination-member.component';
import { SuccesComponent } from './displayMesage/succes/succes.component';
import { ErrorComponent } from './displayMesage/error/error.component';
import { FondateursDetailComponent } from './fondateurs-detail/fondateurs-detail.component';
import { PayementSubcriptionComponent } from './payement-subcription/payement-subcription.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { AsideKefiUserComponent } from './aside-kefi-user/aside-kefi-user.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MessageSuccessComponent } from './displayMessage/message-success/message-success.component';
import { MessageErrorComponent } from './displayMessage/message-error/message-error.component';
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
    EventDetailsComponent,
    KefiEventTableInfosComponent,
    ButtonsParticipationEventComponent,
    CommentsEventsSectionComponent,
    MembersAreaDetailComponent,
    PaginationMemberComponent,
    SuccesComponent,
    ErrorComponent,
    FondateursDetailComponent,
    PayementSubcriptionComponent,
    AsideKefiUserComponent,
    MessageSuccessComponent,
    MessageErrorComponent,



  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_ABjBagJXX4p90kE1tnjXy7Aj00WAojb0VO'),
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    IvyCarouselModule

  ],
  providers: [UserService,EventsService, AuthGuard, LoginService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
