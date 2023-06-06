import { Component, OnInit } from '@angular/core';
import { UserAuthResponseModel } from '../_models/user_models';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notification.service';
import { NotificationModel } from '../_models/notification_models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public user: UserAuthResponseModel =
    this.authenticationService.getCurrentUser();

  notifications: NotificationModel[] = [];

  constructor(
    public authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.populateNotifications();
  }

  ngOnInit(): void {}

  populateNotifications() {
    console.log('buradayız');
    this.notificationService
      .getAllNotifications(this.user.user.user_id.toString())
      .subscribe(response => {
        console.log(response);
        response.forEach(element => {
          let temp = {
            notification_id: element.notification_id,
            user_id: element.user_id,
            created_at: element.created_at,
            details: element.details
          };
          this.notifications.push(temp);
        });
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Logout successful');
  }
}
