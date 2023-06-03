import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../_models/profile_models';
import { ProfileService } from '../_services/profile.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserAuthResponseModel } from '../_models/user_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { WorkExperienceDialogComponent } from "./work-experience-dialog/work-experience-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeElement = 'information';
  // Get the id from the link in the navbar
  id = this.route.snapshot.paramMap.get('id');

  profile_user: any;
  userBasicInfo: ProfileModel | null = null;

  constructor(
    public profileService: ProfileService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    console.log(this.id);
    // this.userBasicInfo = this.profileService.getUserBasicInfo();
  }

  ngOnInit(): void {
    this.profileService
      .getUserById(this.id)
      .toPromise()
      .then(
        response => {
          this.profile_user = response[0];
        },
        error => {
          console.log(error);
        }
      );
  }

  setActiveElement(element) {
    this.activeElement = element;
  }

  addWorkExperience() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(WorkExperienceDialogComponent, dialogConfig);
  }
}
