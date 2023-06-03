import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { AuthenticationService } from '../_services/authentication.service';
import { UserAuthResponseModel } from '../_models/user_models';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: UserAuthResponseModel =
    this.authenticationService.getCurrentUser();

  constructor(
    private dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // console.log(this.user);
  }

  createPost() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(CreatePostDialogComponent, dialogConfig);
  }
}
