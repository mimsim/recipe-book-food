import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseModel } from '../shared/authResponseModel.model';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<UserModel>();

  constructor(private http: HttpClient) { }

  singup(email: string, password: string) {
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSc689TI4kToIN1_3VaqWMHooHN7UgkWI', {
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
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSc689TI4kToIN1_3VaqWMHooHN7UgkWI',
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

  private handleAuth(email: string, userId: string, token: string, expiresIn: number){
    const experitionDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, experitionDate);
    this.user.next(user);
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
