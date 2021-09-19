import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );   
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
