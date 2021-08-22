import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponseModel } from '../shared/authResponseModel.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singup(email: string,password: string) {
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSc689TI4kToIN1_3VaqWMHooHN7UgkWI', {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'Unknown error';
      if (!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
         errorMessage = 'This email exist'
      }
      return throwError(errorMessage);
    }));
  }
}
