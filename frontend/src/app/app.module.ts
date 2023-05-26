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
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
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
    CreatePostDialogComponent
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
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
