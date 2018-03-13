import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  private loc: string;
  constructor(
    private recipeService: RecipeService,
    public auth: AuthService
  ) { 
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }
  getMyRecipes(): void {
    this.recipeService.getMyRecipes().subscribe(recipes => this.recipes = recipes);
  }
  add(form, recipeName: string): void {
    const authorId = this.auth.user[0].id;
    console.log(authorId);
    const recipe = { name: recipeName, authorId, flavours: [] };
    const flavours = document.getElementsByClassName("flavourName");
    const flavourProportions = document.getElementsByClassName("flavourProportions");
    for (let i = 0; i < flavours.length; i++) {
      recipe.flavours.push({ name: flavours[i].value, proportion: flavourProportions[i].value })
    }
    this.recipeService.addRecipe(recipe as Recipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      });
    form.reset();
  }
  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter(h => h !== recipe);
    this.recipeService.deleteRecipe(recipe).subscribe();
  }
  checkLocation(): void {
    if(this.loc == "/my-recipes") {      
      this.getMyRecipes();
    }
    else if(this.loc == "/recipes") {
      this.getRecipes();
    }
  }
  ngOnInit() {
    this.loc = location.pathname;
    this.checkLocation();
  }
  addFlavour() {
    const flavoursBox = document.querySelector('.add-recipe-form .flavours');
    const flavourRow = document.createElement("div");
    flavourRow.className = "flavour-row";
    flavourRow.innerHTML = "<label>Name: <input class='flavourName' /> </label><label>Proportions: <input class='flavourProportions'  /></label>";
    flavoursBox.appendChild(flavourRow);
  }

}
