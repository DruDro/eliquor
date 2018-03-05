import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }
  add(id: string, recipeName: string): void {
    const form = document.getElementById(id);
    const recipe = {name: recipeName, flavours: []};
    const flavours = document.getElementsByClassName("flavourName");
    const flavourProportions = document.getElementsByClassName("flavourProportions");
    for(let i = 0; i < flavours.length; i++){
      recipe.flavours.push({name:flavours[i].value, proportion: flavourProportions[i].value})
    }
    this.recipeService.addRecipe( recipe  as Recipe )
      .subscribe(recipe => {
        this.recipes.push(recipe);
      });
      form.reset();
  }
  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter(h => h !== recipe);
    this.recipeService.deleteRecipe(recipe).subscribe();
  }
  ngOnInit() {
    this.getRecipes();
  }
  addFlavour(){
    const flavoursBox = document.querySelector('.add-recipe-form .flavours');
    const flavourRow = document.createElement("div");
    flavourRow.className = "flavour-row";
    flavourRow.innerHTML = "<label>Name: <input class='flavourName' /> </label><label>Proportions: <input class='flavourProportions'  /></label>";
    flavoursBox.appendChild(flavourRow);
  }

}
