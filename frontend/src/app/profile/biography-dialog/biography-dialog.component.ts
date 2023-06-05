import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/_services/profile.service';
@Component({
  selector: 'app-biography-dialog',
  templateUrl: './biography-dialog.component.html',
  styleUrls: ['./biography-dialog.component.css']
})
export class BiographyDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<BiographyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Biography
  ) {}

  ngOnInit(): void {}
}

export interface Biography {
  user_id: number;
  biography: string;
}
