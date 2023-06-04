import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  LogInRequestModel,
  UserAuthResponseModel,
  RegisterModel
} from '../_models/user_models';
import {
  AwardModel,
  CertificationModel,
  EducationalExperienceModel,
  ProfileModel,
  ProfileUpdateRequestModel,
  ProjectModel,
  PublicationModel,
  TestScoreModel,
  VoluntaryExperienceModel,
  WorkExperienceModel
} from '../_models/profile_models';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService
  ) {}

  getUserBasicInfo(): ProfileModel | null {
    // Get the user from authentication service
    const user: UserAuthResponseModel =
      this.authenticationService.getCurrentUser();
    this.http
      .get<ProfileModel>(this.baseUrl + 'profile/' + user.user.user_id)
      .subscribe(
        response => {
          return response;
        },
        error => {
          console.log(error);
        }
      );

    return null;
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'user/' + id.toString());
  }

  updateUser(user_id: number, user: ProfileUpdateRequestModel) {
    return this.http.put(
      this.baseUrl + 'user/update/' + user_id.toString(),
      user
    );
  }

  getEducationalExperiences(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/educational-experience/' + id);
  }

  getWorkExperiences(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/work-experience/' + id);
  }

  getVoluntaryExperiences(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/voluntary-experience/' + id);
  }

  getTestScores(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/test-score/' + id);
  }

  getProjects(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/project/' + id);
  }

  getAward(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/award/' + id);
  }

  getPublication(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/publication/' + id);
  }

  getCertification(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/certification/' + id);
  }

  getSkills(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/skill/' + id);
  }

  addEducationalExperience(educationalExperience: EducationalExperienceModel) {
    return this.http.post(
      this.baseUrl + 'profile/educational-experience',
      educationalExperience
    );
  }

  addWorkExperience(workExperience: WorkExperienceModel) {
    return this.http.post(
      this.baseUrl + 'profile/work-experience',
      workExperience
    );
  }

  addVoluntaryExperience(voluntaryExperience: VoluntaryExperienceModel) {
    return this.http.post(
      this.baseUrl + 'profile/voluntary-experience',
      voluntaryExperience
    );
  }

  addTestScore(testScore: TestScoreModel) {
    return this.http.post(this.baseUrl + 'profile/test-score', testScore);
  }

  addProject(project: ProjectModel) {
    return this.http.post(this.baseUrl + 'profile/project', project);
  }

  addAward(award: AwardModel) {
    return this.http.post(this.baseUrl + 'profile/award', award);
  }

  addPublication(publication: PublicationModel) {
    return this.http.post(this.baseUrl + 'profile/publication', publication);
  }

  addCertification(certification: CertificationModel) {
    return this.http.post(
      this.baseUrl + 'profile/certification',
      certification
    );
  }

  addSkill(skill: any) {
    return this.http.post(this.baseUrl + 'profile/skill', skill);
  }
}
