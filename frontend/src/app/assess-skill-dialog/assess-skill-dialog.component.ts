import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssessSkillModel } from '../_models/functionality_models';
import { ProfileService } from '../_services/profile.service';
@Component({
  selector: 'app-assess-skill-dialog',
  templateUrl: './assess-skill-dialog.component.html',
  styleUrls: ['./assess-skill-dialog.component.css']
})
export class AssessSkillDialogComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<AssessSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RateSkill
  ) {}

  ngOnInit(): void {}

  assessSkill() {
    console.log(this.data);
    if (!this.data.rating) {
      this.toastr.error('Rating is required');
      return;
    }
    let temp: AssessSkillModel = {
      assessor_user_id: this.data.assessor_id,
      skill_id: this.data.skill_id,
      rating: this.data.rating
    };
    this.profileService.assessSkill(temp).subscribe(
      response => {
        this.toastr.success('Skill assessed successfully');
        this.dialogRef.close();
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error assessing skill');
      }
    );
  }
}

export interface RateSkill {
  assessor_id: number;
  skill_id: number;
  skill_name: string;
  rating: number;
}
