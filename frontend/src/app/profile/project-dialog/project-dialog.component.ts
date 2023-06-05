import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  is_ongoing = false;
  end_date = 'End Date';
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {}

  ngOnInit(): void {}

  addProject() {
    // Convert dates to ISO format
    const a = new Date(this.data.start_date);
    this.data.start_date = a.toISOString().split('T')[0];
    const b = new Date(this.data.end_date);
    this.data.end_date = b.toISOString().split('T')[0];

    console.log(this.data);
    this.profileService.addProject(this.data).subscribe(
      response => {
        this.toastr.success('Project added successfully');
        this.dialogRef.close(this.data);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding project');
      }
    );
  }

  changeOngoing() {
    if (this.is_ongoing) {
      this.data.end_date = '';
      this.end_date = 'Present';
    } else {
      this.end_date = 'End Date';
    }
  }
}
