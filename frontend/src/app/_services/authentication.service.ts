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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<UserAuthResponseModel | null>(
    null
  );
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: LogInRequestModel) {
    return this.http.post(this.baseUrl + 'auth/login', model).pipe(
      map((response: UserAuthResponseModel) => {
        const user = response;
        if (user) {
          const loggedInUser: UserAuthResponseModel = {
            token: user.token,
            user: user.user
          };

          this.setCurrentUser(loggedInUser);
        }
      })
    );
  }

  register(model: RegisterModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'auth/register', model);
  }

  setCurrentUser(user: UserAuthResponseModel) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
