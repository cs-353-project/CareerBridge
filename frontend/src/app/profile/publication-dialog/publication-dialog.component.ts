import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.css']
})
export class PublicationDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<PublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PublicationModel
  ) {}

  ngOnInit(): void {}

  addPublication() {
    // Convert dates to ISO format
    const a = new Date(this.data.publication_date);
    this.data.publication_date = a.toISOString().split('T')[0];

    this.profileService.addPublication(this.data).subscribe(
      response => {
        this.toastr.success('Publication is added successfully');
        this.dialogRef.close(this.data);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding publication');
      }
    );
  }
}
