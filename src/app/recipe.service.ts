import { Injectable } from '@angular/core';
import { Recipe } from './Recipe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RecipeService {
  getRecipes(): Observable<Recipe[]> {
    this.messageService.add('RecipeService: fetched recipes');
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        tap(recipes => this.log(`fetched recipes`)),
        catchError(this.handleError('getRecipes', []))
      );
  }
  getTopRecipes(): Observable<Recipe[]> {
    this.messageService.add('RecipeService: fetched top recipes');
    return this.http.get<Recipe[]>(this.topRecipesUrl)
      .pipe(
        tap(recipes => this.log(`fetched recipes`)),
        catchError(this.handleError('getRecipes', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, httpOptions).pipe(
      tap(_ => this.log(`updated recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }
  addRecipe (recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, httpOptions).pipe(
      tap((recipe: Recipe) => this.log(`added hero w/ id=${recipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }
  deleteRecipe (recipe: Recipe | number): Observable<Recipe> {
    const id = typeof recipe === 'number' ? recipe : recipe.id;
    const url = `${this.recipesUrl}/${id}`;
  
    return this.http.delete<Recipe>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesUrl}?q=${term}`).pipe(
      tap(_ => this.log(`found recipes matching "${term}"`)),
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    private log(message: string) {
    this.messageService.add('RecipeService: ' + message);
  }
  private recipesUrl = 'http://localhost:3001/recipes';  // URL to web api
  private topRecipesUrl = 'http://localhost:3001/recipes?_sort=rating&_order=desc&_start=0&_end=4';  // URL to web api

}
