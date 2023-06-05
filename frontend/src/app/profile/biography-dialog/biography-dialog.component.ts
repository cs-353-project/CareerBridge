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

  submit() {
    console.log(this.data.biography);
    this.profileService
      .updateBio({ biography: this.data.biography }, this.data.user_id)
      .subscribe(
        response => {
          this.toastr.success('Biography updated successfully!');
          this.dialogRef.close(this.data.biography);
        },
        error => {
          console.log(error);
        }
      );
  }
}

export interface Biography {
  user_id: number;
  biography: string;
}
