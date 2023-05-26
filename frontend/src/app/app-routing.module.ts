import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedComponent } from './feed/feed.component';
import { AdsComponent } from './ads/ads.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAdDetailsComponent } from './view-ad-details/view-ad-details.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'ads', component: AdsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'view-ad/:id', component: ViewAdDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
