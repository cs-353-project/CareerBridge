import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillModel } from '../../_models/profile_models';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.css']
})
export class SkillDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<SkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillModel
  ) {}

  ngOnInit(): void {}

  addSkill() {
    this.profileService.addSkill(this.data).subscribe(
      response => {
        this.toastr.success('Skill added successfully');
        this.dialogRef.close();
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error adding skill');
      }
    );
  }
}
