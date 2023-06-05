import { Component, OnInit } from '@angular/core';
import {
  EducationalExperienceModel,
  ProfileModel,
  ProfileUpdateRequestModel,
  SkillModel,
  WorkExperienceModel
} from '../_models/profile_models';
import { ProfileService } from '../_services/profile.service';
import { AuthenticationService } from '../_services/authentication.service';
import {UserModel} from '../_models/user_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkExperienceDialogComponent } from './work-experience-dialog/work-experience-dialog.component';
import { EducationalExperienceDialogComponent } from './educational-experience-dialog/educational-experience-dialog.component';
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeElement = 'information';
  // Get the id from the link in the navbar
  id = this.route.snapshot.paramMap.get('id');
  userBasicInfo: ProfileModel | null = null;
  user: UserModel = this.authenticationService.getCurrentUser().user;

  workExperiences: WorkExperienceModel[] = [];
  educationalExperiences: EducationalExperienceModel[] = [];
  skills: SkillModel[] = [];

  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;

  constructor(
    public profileService: ProfileService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {
    console.log(this.id);
  }

  ngOnInit(): void {
    this.profileService
      .getUserBasicInfoById(+this.id)
      .toPromise()
      .then(
        response => {
          response.forEach(element => {
            this.userBasicInfo = {
              profile_id: element.profile_id,
              user_id: element.user_id,
              avatar: element.avatar,
              country: element.country,
              external_portfolio_url: element.external_portfolio_url,
              address: element.address,
              biography: element.biography,
              is_private: element.is_private,
              resume: element.resume,
              phone_number: element.phone_number,
              is_application_specific: element.is_application_specific,
              created_at: element.created_at
            };
            console.log(this.userBasicInfo);
          });
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
          this.workExperiences.push(temp);
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
          this.educationalExperiences.push(temp);
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
          this.skills.push(temp);
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

  uploadResume(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }

    let updateRequest: ProfileUpdateRequestModel = {
      resume: this.selectedFile
    };
    console.log(this.selectedFile);
    this.profileService.updateUser(+this.id, this.userBasicInfo).subscribe(
      response => {
        this.toastr.success('Resume uploaded successfully!');
      },
      error => {
        this.toastr.error('Resume upload failed!');
      }
    );
  }

  deleteResume() {}
}
