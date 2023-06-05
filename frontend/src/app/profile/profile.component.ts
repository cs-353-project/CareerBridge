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
import { UserAuthResponseModel } from '../_models/user_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkExperienceDialogComponent } from './work-experience-dialog/work-experience-dialog.component';
import { EducationalExperienceDialogComponent } from './educational-experience-dialog/educational-experience-dialog.component';
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { BasicInfoDialogComponent } from './basic-info-dialog/basic-info-dialog.component';
import { BiographyDialogComponent } from './biography-dialog/biography-dialog.component';
import { VoluntaryExperienceDialogComponent } from './voluntary-experience-dialog/voluntary-experience-dialog.component';
import { HttpClient } from '@angular/common/http';

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

  profile_name: string;
  email: string;

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
    private http: HttpClient
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
      .getUserById(+this.id)
      .toPromise()
      .then(response => {
        response.forEach(element => {
          this.profile_name = element.first_name + ' ' + element.last_name;
          this.email = element.email;
        });
      });

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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workExperiences.push(result);
      }
    });
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
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.profileService.uploadResume(formData, +this.id).subscribe(
      response => {
        this.toastr.success('Resume uploaded successfully!');
      },
      error => {
        this.toastr.error('Error uploading resume!');
      }
    );
  }

  downloadResume() {
    this.profileService.downloadResume(+this.id).subscribe((data: Blob) => {
      const downloadURL = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(downloadURL);
    });
  }

  deleteResume() {
    this.profileService.deleteResume(+this.id).subscribe(
      response => {
        this.toastr.success('Resume deleted successfully!');
      },
      error => {
        this.toastr.error('Error deleting resume!');
      }
    );
  }

  editBasicInfo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      user_id: this.id,
      email: this.email,
      phone_number: this.userBasicInfo.phone_number,
      address: this.userBasicInfo.address,
      country: this.userBasicInfo.country,
      external_portfolio_url: this.userBasicInfo.external_portfolio_url
    };
    const dialogRef = this.dialog.open(BasicInfoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userBasicInfo.phone_number = result.phone_number;
        this.userBasicInfo.address = result.address;
        this.userBasicInfo.country = result.country;
        this.userBasicInfo.external_portfolio_url =
          result.external_portfolio_url;
      }
    });
  }

  editBiography() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      user_id: this.id,
      biography: this.userBasicInfo.biography
    };
    const dialogRef = this.dialog.open(BiographyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userBasicInfo.biography = result.biography;
      }
    });
  }

  addVoluntaryExperience() {
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
      responsibility: '',
      organization_name: ''
    };
    const dialogRef = this.dialog.open(
      VoluntaryExperienceDialogComponent,
      dialogConfig
    );
  }
}
