import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppinListAction from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
    ]
};
export function shoppingListReducer(state = initialState, action: ShoppinListAction.AddIngredient) {
    switch(action.type){
        case ShoppinListAction.ADD_INGREDIENT:        
        return {
            ...state,
            ingredients: [...state.ingredients, action.paylod]
        };
        default:
            return state;
    }

}