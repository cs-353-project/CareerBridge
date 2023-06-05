import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { PolicyDialogComponent } from './signup/policy-dialog/policy-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './feed/feed.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { AdsComponent } from './ads/ads.component';
import { MessagesComponent } from './messages/messages.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ProfileComponent } from './profile/profile.component';
import { ViewAdDetailsComponent } from './view-ad-details/view-ad-details.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CreatePostDialogComponent } from './feed/create-post-dialog/create-post-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CandidatesComponent } from './candidates/candidates.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { WorkExperienceDialogComponent } from './profile/work-experience-dialog/work-experience-dialog.component';
import { NewAdDialogComponent } from './ads/new-ad-dialog/new-ad-dialog.component';
import { EducationalExperienceDialogComponent } from './profile/educational-experience-dialog/educational-experience-dialog.component';
import { SkillDialogComponent } from './profile/skill-dialog/skill-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ResponseDialogComponent } from './ads/response-dialog/response-dialog.component';
import { BasicInfoDialogComponent } from './profile/basic-info-dialog/basic-info-dialog.component';
import { BiographyDialogComponent } from './profile/biography-dialog/biography-dialog.component';
import { VoluntaryExperienceDialogComponent } from './profile/voluntary-experience-dialog/voluntary-experience-dialog.component';
import { ProjectDialogComponent } from './profile/project-dialog/project-dialog.component';
import { CertificationDialogComponent } from './profile/certification-dialog/certification-dialog.component';
import { AwardDialogComponent } from './profile/award-dialog/award-dialog.component';
import { TestScoreDialogComponent } from './profile/test-score-dialog/test-score-dialog.component';
import { PublicationDialogComponent } from './profile/publication-dialog/publication-dialog.component';
import { LanguageDialogComponent } from './profile/language-dialog/language-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PolicyDialogComponent,
    ForgotPasswordComponent,
    NavigationComponent,
    FeedComponent,
    AdsComponent,
    MessagesComponent,
    ProfileComponent,
    ViewAdDetailsComponent,
    CreatePostDialogComponent,
    CandidatesComponent,
    AdminPanelComponent,
    WorkExperienceDialogComponent,
    NewAdDialogComponent,
    EducationalExperienceDialogComponent,
    SkillDialogComponent,
    ConfirmationDialogComponent,
    ResponseDialogComponent,
    BasicInfoDialogComponent,
    BiographyDialogComponent,
    VoluntaryExperienceDialogComponent,
    ProjectDialogComponent,
    CertificationDialogComponent,
    AwardDialogComponent,
    TestScoreDialogComponent,
    PublicationDialogComponent,
    LanguageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTreeModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
