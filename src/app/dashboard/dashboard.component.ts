import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes.filter(recipeItem => recipeItem.rating > 4).sort((a,b) => a.rating < b.rating).slice(0,5));
  }
}