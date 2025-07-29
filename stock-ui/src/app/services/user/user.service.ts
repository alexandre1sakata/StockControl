import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignUpUserRequest } from '../../models/interfaces/user/SignUpUserRequest';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from '../../models/interfaces/user/SignUpUserResponse';
import { AuthRequest } from '../../models/interfaces/user/auth/authRequest';
import { AuthResponse } from '../../models/interfaces/user/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

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
}
