import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAdDialogComponent } from './new-ad-dialog/new-ad-dialog.component';
import { JobAdFilterRequestModel } from '../_models/job_ad_models';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  id_view: number = 5;
  showFilters: boolean = false;
  id: number;

  jobAdFilter: JobAdFilterRequestModel = {
    pay_range_min: 0,
    pay_range_max: 10000000,
    type: '',
    location: '',
    setting: '',
    domain: '',
    status: ''
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.id = this.authService.getCurrentUser().user.user_id;
  }

  viewAdDetails() {
    this.router.navigate(['/view-ad', this.id_view]);
  }

  createAd() {
    console.log('create ad');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      creator_id: this.id,
      title: '',
      description: '',
      organization: '',
      setting: '',
      location: '',
      type: '',
      pay_range_min: 0,
      pay_range_max: 0,
      domain: '',
      is_open: false,
      external_url: '',
      skills: [],
      required_degrees: []
    };

    const dialogRef = this.dialog.open(NewAdDialogComponent, dialogConfig);
  }

  filterChange() {
    this.showFilters = !this.showFilters;
  }
}
