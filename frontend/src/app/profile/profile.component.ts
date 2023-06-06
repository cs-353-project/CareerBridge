import { Component, OnInit } from '@angular/core';
import {
  AwardModel,
  CertificationModel,
  EducationalExperienceModel,
  ProfileModel,
  LanguageProficiencyModel,
  ProjectModel,
  PublicationModel,
  SkillModel,
  TestScoreModel,
  VoluntaryExperienceModel,
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
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { CertificationDialogComponent } from './certification-dialog/certification-dialog.component';
import { AwardDialogComponent } from './award-dialog/award-dialog.component';
import { TestScoreDialogComponent } from './test-score-dialog/test-score-dialog.component';
import { PublicationDialogComponent } from './publication-dialog/publication-dialog.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';
import { AssessSkillDialogComponent } from '../assess-skill-dialog/assess-skill-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeElement = 'information';
  // Get the id from the link in the navbar
  user = this.authenticationService.getCurrentUser().user;
  id = this.user.user_id.toString();
  visited_id = this.route.snapshot.paramMap.get('id');
  userBasicInfo: ProfileModel | null = null;

  profile_name: string;
  profile_role: string;
  email: string;

  workExperiences: WorkExperienceModel[] = [];
  educationalExperiences: EducationalExperienceModel[] = [];
  voluntaryExperiences: VoluntaryExperienceModel[] = [];
  skills: SkillModel[] = [];
  projects: ProjectModel[] = [];
  certifications: CertificationModel[] = [];
  awards: AwardModel[] = [];
  test_scores: TestScoreModel[] = [];
  publications: PublicationModel[] = [];
  languages: LanguageProficiencyModel[] = [];

  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;

  constructor(
    public profileService: ProfileService,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    console.log(this.id);
  }

  ngOnInit(): void {
    this.profileService
      .getUserBasicInfoById(+this.visited_id)
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
      .getUserById(+this.visited_id)
      .toPromise()
      .then(response => {
        console.log(response);
        response.forEach(element => {
          this.profile_name = element.first_name + ' ' + element.last_name;
          this.profile_role = element.user_role;
          this.email = element.email;
        });
      });

    this.profileService
      .getWorkExperiences(this.visited_id)
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
      .getEducationalExperiences(this.visited_id)
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
      .getVoluntaryExperiences(this.visited_id)
      .toPromise()
      .then(data => {
        data.forEach(element => {
          let temp: VoluntaryExperienceModel = {
            experience: {
              experience_id: element.experience.experience_id,
              profile_id: element.experience.profile_id,
              title: element.experience.title,
              start_date: element.experience.start_date,
              end_date: element.experience.end_date,
              description: element.experience.description,
              current_status: element.experience.current_status
            },
            organization_name: element.organization_name,
            responsibility: element.responsibility
          };
          this.voluntaryExperiences.push(temp);
          console.log(this.voluntaryExperiences);
        });
      });

    this.profileService
      .getSkills(this.visited_id)
      .toPromise()
      .then(data => {
        data.forEach(element => {
          console.log(element);
          let temp: SkillModel = {
            rating: element.rating,
            skill_id: element.skill_id,
            profile_id: element.profile_id,
            name: element.name,
            is_verified: element.is_verified,
            is_master_skill: element.is_master_skill
          };
          this.skills.push(temp);
        });
      });

    this.profileService.getProjects(this.visited_id).subscribe(data => {
      data.forEach(element => {
        let temp: ProjectModel = {
          project_id: element.project_id,
          profile_id: element.profile_id,
          title: element.title,
          start_date: element.start_date,
          end_date: element.end_date,
          description: element.description,
          project_url: element.project_url
        };
        this.projects.push(temp);
      });
    });

    this.profileService.getCertification(this.visited_id).subscribe(data => {
      data.forEach(element => {
        let temp: CertificationModel = {
          certification_id: element.certification_id,
          profile_id: element.profile_id,
          certification_name: element.certification_name,
          issuer: element.issuer,
          issue_date: element.issue_date,
          expiration_date: element.expiration_date,
          credential_url: element.credential_url,
          description: element.description
        };
        this.certifications.push(temp);
      });
    });

    this.profileService.getAward(this.visited_id).subscribe(data => {
      data.forEach(element => {
        let temp: AwardModel = {
          award_id: element.award_id,
          profile_id: element.profile_id,
          title: element.title,
          issuer: element.issuer,
          issue_date: element.issue_date,
          description: element.description
        };
        this.awards.push(temp);
      });
    });

    this.profileService.getTestScores(this.visited_id).subscribe(data => {
      data.forEach(element => {
        let temp: TestScoreModel = {
          test_score_id: element.test_score_id,
          profile_id: element.profile_id,
          test_name: element.test_name,
          score: element.score,
          test_date: element.test_date,
          description: element.description
        };
        this.test_scores.push(temp);
      });
    });

    this.profileService.getPublication(this.visited_id).subscribe(data => {
      data.forEach(element => {
        let temp: PublicationModel = {
          publication_id: element.publication_id,
          profile_id: element.profile_id,
          title: element.title,
          publisher: element.publisher,
          publication_date: element.publication_date,
          description: element.description,
          publication_url: element.publication_url
        };
        this.publications.push(temp);
      });
    });

    this.profileService
      .getLanguagesByProfileId(this.visited_id)
      .subscribe(data => {
        data.forEach(element => {
          let temp: LanguageProficiencyModel = {
            language_id: element.language_id,
            profile_id: element.profile_id,
            language_name: element.language_name,
            proficiency: element.proficiency
          };
          this.languages.push(temp);
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
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding work experience!');
      }
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
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding educational experience!');
      }
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
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding skill!');
      }
    );
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
        this.userBasicInfo.resume = 1;
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
        this.userBasicInfo.resume = 0;
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
        this.userBasicInfo.biography = result;
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
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding voluntary experience!');
      }
    );
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      title: '',
      start_date: '',
      end_date: '',
      description: '',
      project_url: ''
    };
    const dialogRef = this.dialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding project!');
      }
    );
  }

  addCertificate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      certification_name: '',
      issuer: '',
      issue_date: '',
      expiration_date: '',
      credential_url: '',
      description: ''
    };
    const dialogRef = this.dialog.open(
      CertificationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding certificate!');
      }
    );
  }

  addAward() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      title: '',
      issuer: '',
      issue_date: '',
      description: ''
    };
    const dialogRef = this.dialog.open(AwardDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding award!');
      }
    );
  }

  addTestScore() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      test_name: '',
      score: '',
      test_date: '',
      description: ''
    };
    const dialogRef = this.dialog.open(TestScoreDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding test score!');
      }
    );
  }

  addPublication() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      title: '',
      publisher: '',
      publication_date: '',
      description: '',
      publication_url: ''
    };
    const dialogRef = this.dialog.open(
      PublicationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding publication!');
      }
    );
  }

  addLanguage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      profile_id: this.id,
      language_name: '',
      proficiency: ''
    };
    const dialogRef = this.dialog.open(LanguageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      error => {
        this.toastr.error('Error adding language!');
      }
    );
  }

  assessSkill(skill: SkillModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      skill_id: skill.skill_id,
      skill_name: skill.name,
      rating: 0,
      assessor_id: this.id
    };
    const dialogRef = this.dialog.open(
      AssessSkillDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          skill.rating = result;
        }
      },
      error => {
        this.toastr.error('Error adding skill!');
      }
    );
  }

  deleteExperience(experience: any, experience_list: any[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text:
        'Are you sure you want to delete ' + experience.experience.title + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService
            .deleteExperienceById(experience.experience.experience_id)
            .subscribe(
              response => {
                this.toastr.success('Experience deleted successfully!');
                experience_list.splice(experience_list.indexOf(experience), 1);
              },
              error => {
                this.toastr.error('Error deleting experience!');
              }
            );
        }
      },
      error => {
        this.toastr.error('Error deleting experience!');
      }
    );
  }

  deleteProject(project: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + project?.title + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService.deleteProjectById(project?.project_id).subscribe(
            response => {
              if (response) {
                this.toastr.success('Project deleted successfully!');
                this.projects.splice(this.projects.indexOf(project), 1);
              }
            },
            error => {
              this.toastr.error('Error deleting project!');
            }
          );
        }
      },
      error => {
        this.toastr.error('Error deleting project!');
      }
    );
  }

  deleteCertification(certification: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text:
        'Are you sure you want to delete ' +
        certification?.certification_name +
        '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService
            .deleteCertificationById(certification?.certification_id)
            .subscribe(
              response => {
                if (response) {
                  this.toastr.success('Certificate deleted successfully!');
                  this.certifications.splice(
                    this.certifications.indexOf(certification),
                    1
                  );
                }
              },
              error => {
                this.toastr.error('Error deleting certificate!');
              }
            );
        }
      },
      error => {
        this.toastr.error('Error deleting certificate!');
      }
    );
  }

  deleteAward(award: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + award?.title + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService.deleteAwardById(award?.award_id).subscribe(
            response => {
              if (response) {
                this.toastr.success('Award deleted successfully!');
                this.awards.splice(this.awards.indexOf(award), 1);
              }
            },
            error => {
              this.toastr.error('Error deleting award!');
            }
          );
        }
      },
      error => {
        this.toastr.error('Error deleting award!');
      }
    );
  }

  deleteTestScore(test_score: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + test_score?.test_name + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService
            .deleteTestScoreById(test_score?.test_score_id)
            .subscribe(
              response => {
                if (response) {
                  this.toastr.success('Test score deleted successfully!');
                  this.test_scores.splice(
                    this.test_scores.indexOf(test_score),
                    1
                  );
                }
              },
              error => {
                this.toastr.error('Error deleting test score!');
              }
            );
        }
      },
      error => {
        this.toastr.error('Error deleting test score!');
      }
    );
  }

  deletePublication(publication: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + publication?.title + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService
            .deletePublicationById(publication?.publication_id)
            .subscribe(
              response => {
                if (response) {
                  this.toastr.success('Publication deleted successfully!');
                  this.publications.splice(
                    this.publications.indexOf(publication),
                    1
                  );
                }
              },
              error => {
                this.toastr.error('Error deleting publication!');
              }
            );
        }
      },
      error => {
        this.toastr.error('Error deleting publication!');
      }
    );
  }

  deleteSkill(skill: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + skill?.name + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService.deleteSkillById(skill?.skill_id).subscribe(
            response => {
              if (response) {
                this.toastr.success('Skill deleted successfully!');
                this.skills.splice(this.skills.indexOf(skill));
              }
            },
            error => {
              this.toastr.error('Error deleting skill!');
            }
          );
        }
      },
      error => {
        this.toastr.error('Error deleting skill!');
      }
    );
  }

  deleteLanguage(language: any) {
    console.log(language);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      text: 'Are you sure you want to delete ' + language?.language_name + '?'
    };
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.profileService
            .deleteLanguageById(language?.language_id)
            .subscribe(
              response => {
                if (response) {
                  this.toastr.success('Language deleted successfully!');
                  this.languages.splice(this.languages.indexOf(language));
                }
              },
              error => {
                this.toastr.error('Error deleting language!');
              }
            );
        }
      },
      error => {
        this.toastr.error('Error deleting language!');
      }
    );
  }

  refresh() {
    window.location.reload();
  }

  range(n: number): number[] {
    return Array(n)
      .fill(0)
      .map((_, index) => index);
  }
}
