import { Component, OnInit } from '@angular/core';
import {
  EducationalExperienceModel,
  ProfileModel,
  SkillModel,
  WorkExperienceModel
} from '../_models/profile_models';
import { ProfileService } from '../_services/profile.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserAuthResponseModel } from '../_models/user_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkExperienceDialogComponent } from './work-experience-dialog/work-experience-dialog.component';
import { EducationalExperienceDialogComponent } from './educational-experience-dialog/educational-experience-dialog.component';
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeElement = 'information';
  // Get the id from the link in the navbar
  id = this.route.snapshot.paramMap.get('id');
  profile_user: any;
  userBasicInfo: ProfileModel | null = null;

  workExperiences: WorkExperienceModel[] = [];
  educationalExperiences: EducationalExperienceModel[] = [];
  skills: SkillModel[] = [];

  constructor(
    public profileService: ProfileService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    console.log(this.id);
    // this.userBasicInfo = this.profileService.getUserBasicInfo();
  }

  ngOnInit(): void {
    this.profileService
      .getUserById(this.id)
      .toPromise()
      .then(
        response => {
          this.profile_user = response[0];
        },
        error => {
          console.log(error);
        }
      );

    this.profileService
      .getWorkExperiences(this.id)
      .toPromise()
      .then(data => {
        data.forEach(element => {
          let temp: WorkExperienceModel = {
            experience: {
              experience_id: element.experience.experience_id,
              profile_id: element.experience.profile_id,
              title: element.experience.title,
              start_date: element.experience.start_date,
              end_date: element.experience.end_date,
              description: element.experience.description,
              current_status: element.experience.current_status
            },
            company_name: element.company_name,
            setting: element.setting,
            type: element.type
          };
          this.workExperiences.unshift(temp);
        });
      });

    this.profileService
      .getEducationalExperiences(this.id)
      .toPromise()
      .then(data => {
        data.forEach(element => {
          let temp: EducationalExperienceModel = {
            experience: {
              experience_id: element.experience.experience_id,
              profile_id: element.experience.profile_id,
              title: element.experience.title,
              start_date: element.experience.start_date,
              end_date: element.experience.end_date,
              description: element.experience.description,
              current_status: element.experience.current_status
            },
            school_name: element.school_name,
            degree: {
              name: element.degree.name
            },
            field_of_study: element.field_of_study,
            grade: element.grade
          };
          this.educationalExperiences.unshift(temp);
        });
      });

    this.profileService
      .getSkills(this.id)
      .toPromise()
      .then(data => {
        data.forEach(element => {
          let temp: SkillModel = {
            skill_id: element.skill_id,
            profile_id: element.profile_id,
            name: element.name,
            is_verified: element.is_verified,
            is_master_skill: element.is_master_skill
          };
          this.skills.unshift(temp);
        });
      });
  }

  setActiveElement(element) {
    this.activeElement = element;
  }

  addWorkExperience() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      experience: {
        profile_id: this.id,
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        current_status: ''
      },
      company_name: '',
      setting: '',
      type: ''
    };
    const dialogRef = this.dialog.open(
      WorkExperienceDialogComponent,
      dialogConfig
    );
  }

  addEducationalExperience() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      experience: {
        profile_id: this.id,
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        current_status: ''
      },
      grade: '',
      field_of_study: '',
      school_name: '',
      degree: {
        name: ''
      }
    };
    const dialogRef = this.dialog.open(
      EducationalExperienceDialogComponent,
      dialogConfig
    );
  }

  addSkill() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      name: '',
      is_verified: false,
      is_master_skill: false
    };
    const dialogRef = this.dialog.open(SkillDialogComponent, dialogConfig);
  }
}
