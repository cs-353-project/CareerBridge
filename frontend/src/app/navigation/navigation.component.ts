import { Component, OnInit } from '@angular/core';
import { UserAuthResponseModel } from '../_models/user_models';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public user: UserAuthResponseModel =
    this.authenticationService.getCurrentUser();

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  populateNotifications() {
    console.log('populateNotifications');
  }
}
