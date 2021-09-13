import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseModel } from '../shared/authResponseModel.model';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoalding = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.IAppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoalding = authState.loading;
      this.error = authState.authError;   
      if(this.error){
        this.showErrorAlert(this.error);   
      }
    });
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

    let authObs: Observable<AuthResponseModel>;

    this.isLoalding = true;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
      //authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.singup(email, password);
    }

    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoalding = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoalding = false;
    //   }
    // )
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(alertCmpFactory);

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
