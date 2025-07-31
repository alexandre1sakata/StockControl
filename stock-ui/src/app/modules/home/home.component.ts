import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignUpUserRequest } from '../../models/interfaces/user/SignUpUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  createAccountForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userUservice: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router) { }

  onSubmitLogin(): void {
    if (this.loginForm.value && this.loginForm.valid){
      this.userUservice.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response){
              this.cookieService.set('USER_INFO', response.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Welcome ${response?.name}`,
                life: 4000
              })
            }
          },
          error: (err) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Login failed`,
                life: 4000
              })
          }
        })
    }
  }

  onSubmitCreateAccount(): void {
    if (this.createAccountForm.value && this.createAccountForm.valid){
      this.userUservice.createAccount(this.createAccountForm.value as SignUpUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.createAccountForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User created with success!`,
                life: 4000
              })
            }
          },
          error: (err) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Create account failed`,
                life: 4000
              })
          }
        })
    }
  }
}
