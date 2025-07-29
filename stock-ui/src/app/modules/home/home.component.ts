import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SignUpUserRequest } from '../../models/interfaces/user/SignUpUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/authRequest';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService) { }

  onSubmitLogin(): void {
    if (this.loginForm.value && this.loginForm.valid){
      this.userUservice.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response){
              this.cookieService.set('USER_INFO', response.token);
              this.loginForm.reset();
            }
          },
          error: (err) => console.log(err)
        })
    }
  }

  onSubmitCreateAccount(): void {
    if (this.createAccountForm.value && this.createAccountForm.valid){
      this.userUservice.createAccount(this.createAccountForm.value as SignUpUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('user test create success!');
              this.createAccountForm.reset();
              this.loginCard = true;
            }
          },
          error: (err) => console.log(err)
        })
    }
  }
}
