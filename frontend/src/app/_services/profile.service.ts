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
  EducationalExperienceModel,
  ProfileModel
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

  getUserById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'user/' + id);
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

  getSkill(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'profile/skill/' + id);
  }
}
