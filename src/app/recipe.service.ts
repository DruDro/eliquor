import { Injectable } from '@angular/core';
import { Recipe } from './Recipe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecipeService {
  getRecipes(): Observable<Recipe[]> {
    this.messageService.add('RecipeService: fetched recipes');
    return this.http.get<Recipe[]>(this.recipesUrl);
  }
  getRecipe(id: number): Observable<Recipe>  {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`RecipeService: fetched recipe id=${id}`);
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`);
  }
constructor(
  private http: HttpClient,
  private messageService: MessageService) { }
  private log(message: string) {
    this.messageService.add('RecipeService: ' + message);
  }
  private recipesUrl = 'http://localhost:3001/recipes';  // URL to web api

}
