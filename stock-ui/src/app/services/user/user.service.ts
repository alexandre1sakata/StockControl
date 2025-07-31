import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignUpUserRequest } from '../../models/interfaces/user/SignUpUserRequest';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from '../../models/interfaces/user/SignUpUserResponse';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from '../../models/interfaces/user/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  createAccount(requestDatas: SignUpUserRequest): Observable<SignUpUserResponse> {
    return this.http.post<SignUpUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestDatas
    )
  }

  isLoggedIn() : boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO'); 
    return JWT_TOKEN ? true : false;
  }
}
