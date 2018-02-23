import { Injectable } from '@angular/core';
import { Recipe } from './Recipe';
import { RECIPES } from './mock-recipes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class RecipeService {
  getRecipes(): Observable<Recipe[]> {
    this.messageService.add('RecipeService: fetched recipes');
    return of(RECIPES);
  }
  getRecipe(id: number): Observable<Recipe> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`RecipeService: fetched recipe id=${id}`);
    return of(RECIPES.find(recipe => recipe.id === id));
  }
  constructor(private messageService: MessageService) {}

}
