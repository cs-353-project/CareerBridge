import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAdDialogComponent } from './new-ad-dialog/new-ad-dialog.component';
import {
  JobAdFilterRequestModel,
  JobAdvertisementResponseModel
} from '../_models/job_ad_models';
import { AuthenticationService } from '../_services/authentication.service';
import { JobAdService } from '../_services/job_ad.service';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  id_view: number = 5;
  showFilters: boolean = false;
  id: number;
  ads_for_you: JobAdvertisementResponseModel[];
  applied_ads: JobAdvertisementResponseModel[];
  your_ads: JobAdvertisementResponseModel[];
  colors: string[] = [
    'blue',
    'red',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'brown',
    'grey',
    'black'
  ];

  options = { year: 'numeric', month: 'long', day: 'numeric' };

  skills = '';
  degrees = '';

  jobAdFilter: JobAdFilterRequestModel = {
    pay_range_min: 0,
    pay_range_max: 10000000,
    type: '',
    location: '',
    setting: '',
    domain: '',
    is_open: 1,
    skills: [],
    degrees: []
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private adService: JobAdService
  ) {}

  ngOnInit(): void {
    this.id = this.authService.getCurrentUser().user.user_id;
    this.ads_for_you = [];
    this.adService
      .getAllJobAds()
      .toPromise()
      .then(response => {
        response.forEach(element => {
          let date = new Date();
          let create_at = new Date(element.created_at);
          let timedelta = date.getTime() - create_at.getTime();
          timedelta = Math.floor(timedelta / (1000 * 3600 * 24));
          let ad = {
            ad_id: element.ad_id,
            creator_id: element.creator_id,
            title: element.title,
            description: element.description,
            organization: element.organization,
            setting: element.setting,
            location: element.location,
            type: element.type,
            pay_range_min: element.pay_range_min,
            pay_range_max: element.pay_range_max,
            domain: element.domain,
            is_open: element.is_open,
            external_url: element.external_url,
            application_count: element.application_count,
            view_count: element.view_count,
            created_at: element.created_at,
            skills: element.skills,
            required_degrees: element.required_degrees,
            timedelta: timedelta
          };
          this.ads_for_you.push(ad);
          console.log(ad);
        });
      });
    this.applied_ads = [];
    this.adService
      .getJobApplicationsByProfileId(this.id)
      .toPromise()
      .then(response => {
        response.forEach(element => {
          let date = new Date();
          let create_at = new Date(element.created_at);
          let timedelta = date.getTime() - create_at.getTime();
          timedelta = Math.floor(timedelta / (1000 * 3600 * 24));
          let ad = {
            ad_id: element.ad_details[0].ad_id,
            creator_id: element.ad_details[0].creator_id,
            title: element.ad_details[0].title,
            description: element.ad_details[0].description,
            organization: element.ad_details[0].organization,
            setting: element.ad_details[0].setting,
            location: element.ad_details[0].location,
            type: element.ad_details[0].type,
            pay_range_min: element.ad_details[0].pay_range_min,
            pay_range_max: element.ad_details[0].pay_range_max,
            domain: element.ad_details[0].domain,
            is_open: element.ad_details[0].is_open,
            external_url: element.ad_details[0].external_url,
            application_count: element.ad_details[0].application_count,
            view_count: element.ad_details[0].view_count,
            created_at: element.ad_details[0].created_at,
            skills: element.ad_details[0].skills,
            required_degrees: element.ad_details[0].required_degrees,
            timedelta: timedelta
          };
          this.applied_ads.push(ad);
        });
      });
    this.your_ads = [];
    this.adService
      .getJobAds(this.id)
      .toPromise()
      .then(response => {
        response.forEach(element => {
          let date = new Date();
          let create_at = new Date(element.created_at);
          let timedelta = date.getTime() - create_at.getTime();
          timedelta = Math.floor(timedelta / (1000 * 3600 * 24));
          let ad = {
            ad_id: element.ad_id,
            creator_id: element.creator_id,
            title: element.title,
            description: element.description,
            organization: element.organization,
            setting: element.setting,
            location: element.location,
            type: element.type,
            pay_range_min: element.pay_range_min,
            pay_range_max: element.pay_range_max,
            domain: element.domain,
            is_open: element.is_open,
            external_url: element.external_url,
            application_count: element.application_count,
            view_count: element.view_count,
            created_at: element.created_at,
            skills: element.skills,
            required_degrees: element.required_degrees,
            timedelta: timedelta
          };
          this.your_ads.push(ad);
        });
      });
  }

  viewAdDetails(ad: JobAdvertisementResponseModel) {
    this.router.navigate(['/view-ad', ad.ad_id]);
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

  filterAds() {
    this.jobAdFilter.pay_range_min = +this.jobAdFilter.pay_range_min;
    this.jobAdFilter.pay_range_max = +this.jobAdFilter.pay_range_max;
    this.jobAdFilter.is_open = +this.jobAdFilter.is_open;

    if (this.skills != '') {
      this.jobAdFilter.skills = this.skills.split(',');
    }
    if (this.degrees != '') {
      this.jobAdFilter.degrees = this.degrees.split(',');
    }

    if (this.jobAdFilter.type == 'Any') {
      this.jobAdFilter.type = null;
    }

    console.log(this.jobAdFilter);

    // return;
    this.adService.filterJobAds(this.jobAdFilter).subscribe(response => {
      // Update the ads_for_you array
      console.log(response);
      this.ads_for_you = [];
      response.forEach(element => {
        let date = new Date();
        let create_at = new Date(element.created_at);
        let timedelta = date.getTime() - create_at.getTime();
        timedelta = Math.floor(timedelta / (1000 * 3600 * 24));
        let ad = {
          ad_id: element.ad_id,
          creator_id: element.creator_id,
          title: element.title,
          description: element.description,
          organization: element.organization,
          setting: element.setting,
          location: element.location,
          type: element.type,
          pay_range_min: element.pay_range_min,
          pay_range_max: element.pay_range_max,
          domain: element.domain,
          is_open: element.is_open,
          external_url: element.external_url,
          application_count: element.application_count,
          view_count: element.view_count,
          created_at: element.created_at,
          skills: element.skills,
          required_degrees: element.required_degrees,
          timedelta: timedelta
        };
        this.ads_for_you.push(ad);
      });
    });
  }
}
