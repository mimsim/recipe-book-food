import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseModel } from '../shared/authResponseModel.model';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  singup(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSc689TI4kToIN1_3VaqWMHooHN7UgkWI', {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSc689TI4kToIN1_3VaqWMHooHN7UgkWI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuth(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _tiken: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._tiken,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const experitionDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, experitionDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'USER DISABLED';
        break;
    }
    return throwError(errorMessage);
  }
}
