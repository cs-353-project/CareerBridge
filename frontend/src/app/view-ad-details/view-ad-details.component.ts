import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobAdService } from '../_services/job_ad.service';
import { JobAdvertisementResponseModel } from '../_models/job_ad_models';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ResponseDialogComponent } from '../ads/response-dialog/response-dialog.component';
@Component({
  selector: 'app-view-ad-details',
  templateUrl: './view-ad-details.component.html',
  styleUrls: ['./view-ad-details.component.css']
})
export class ViewAdDetailsComponent implements OnInit {
  user_id: number;
  is_applied: boolean = false;
  ad_id: number = +this.route.snapshot.paramMap.get('id');
  candidates: Candidate[] = [];

  dataSource: MatTableDataSource<Candidate>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatTable) CandidateTable!: MatTable<Candidate>;

  displayedColumns = ['name', 'status', 'application_time', 'actions'];

  recruiter_name: string;
  ad: JobAdvertisementResponseModel;
  constructor(
    private route: ActivatedRoute,
    private adService: JobAdService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.adService.getCandidateForJob(this.ad_id).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        let temp = {
          application_id: element.application_id,
          user_id: element.user.user_id,
          name: element.user.first_name + ' ' + element.user.last_name,
          status: element.status,
          application_time: element.application_date
        };
        this.candidates.push(temp);
      });
      this.dataSource = new MatTableDataSource(this.candidates);
      this.dataSource.paginator = this.paginator;
    });

    this.user_id = this.authService.getCurrentUser().user.user_id;

    this.adService
      .getJobDetails(this.ad_id, this.user_id)
      .toPromise()
      .then(response => {
        response.forEach(element => {
          let temp = {
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
            required_degrees: element.required_degrees
          };
          this.is_applied = element.has_applied;
          this.recruiter_name =
            element.creator.first_name + ' ' + element.creator.last_name;
          this.ad = temp;
        });
      });
  }

  backbutton() {
    this.router.navigate(['/ads']);
  }

  apply() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to apply to this job?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adService
          .addJobApplication({
            profile_id: this.user_id,
            ad_id: this.ad_id,
            response: 'Waiting'
          })
          .subscribe(
            res => {
              this.toastr.success('Applied Successfully');
              this.is_applied = true;
            },
            err => {
              this.toastr.error('Error Occured');
            }
          );
      }
    });
  }
  respondApplication(candidate: Candidate) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      application_id: candidate.application_id,
      user_id: candidate.user_id,
      name: candidate.name,
      status: candidate.status,
      application_time: candidate.application_time
    };
    const dialogRef = this.dialog.open(ResponseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        candidate.status = result;
      }
    });
  }
}

export interface Candidate {
  application_id: number;
  user_id: number;
  name: string;
  status: string;
  application_time: string;
}
