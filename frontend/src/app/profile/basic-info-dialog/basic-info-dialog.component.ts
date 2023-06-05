import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-basic-info-dialog',
  templateUrl: './basic-info-dialog.component.html',
  styleUrls: ['./basic-info-dialog.component.css']
})
export class BasicInfoDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<BasicInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasicInfo
  ) {}

  ngOnInit(): void {}

  submit() {}
}

export interface BasicInfo {
  user_id: number;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  external_portfolio_url: string;
}
