import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'food';

  constructor(
    private auhtService: AuthService,
    private store: Store<fromApp.IAppState>,
    private loggingService: LoggingService
    ) { }

  ngOnInit() {
    this.store.dispatch(new AuthActions.AuthoLogin());
    this.loggingService.printLog('hi');
  }

  // loadedFeature = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
}
