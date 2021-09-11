import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
//import * as fromShoppingList from './store/shopping-list.reducer'; 
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Observable<{ ingredients: Ingredient[] }>; 
  private subscription: Subscription;
  // private igChangeSub: Subscription = new Subscription;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromApp.IAppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    // this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
