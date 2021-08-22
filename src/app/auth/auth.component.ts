import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoalding = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSwichMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoalding = true;
    if (this.isLoginMode) {
      //...
    } else {
      this.authService.singup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoalding = false;
        }, errorRes => {
          console.log(errorRes);
          switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            this.error = 'This email exist'
          }
          this.isLoalding = false;
        });
    }

    form.reset();
  }
}
