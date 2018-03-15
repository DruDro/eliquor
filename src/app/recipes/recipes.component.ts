import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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
    public auth: AuthService,
    private router: Router
  ) {

  }

  drawRating(): void {
    $('.recipe-rating').each(function () {
      const starsContainer = this;
      const rating = starsContainer.dataset.rating.toString().split('.');
      const fullStars = rating[0] ? parseInt(rating[0]) : 0;
      const halfStar = rating[1] ? parseInt(rating[1]) : 0;
      $(starsContainer).html('');
      for (let i = 0; i < fullStars; i++) {
        $(starsContainer).append('<i class="fas fa-star"></i>')
      }
      if (halfStar) {
        $(starsContainer).append('<i class="fas fa-star-half"></i>')
      }
      if (!fullStars && !halfStar) {
        for (let i = 0; i < 5; i++) {
          $(starsContainer).append('<i class="far fa-star" style="color:#ffffff5f"></i>')
        }
      }
    });
  }


  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      setTimeout(() => this.drawRating());
    });
  }
  getMyRecipes(): void {
    this.recipeService.getMyRecipes().subscribe(recipes => {
      this.recipes = recipes;
      setTimeout(() => this.drawRating());
    });
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
        setTimeout(() => { this.drawRating() });
      });
    form.reset();
  }
  delete(recipe: Recipe): void {
    if (confirm(`Delete recipe ${recipe.name}?`)) {
      this.recipes = this.recipes.filter(h => h !== recipe);
      this.recipeService.deleteRecipe(recipe).subscribe();
    }
  }
  checkLocation(): void {
    if (this.loc == "/my-recipes") {
      this.getMyRecipes();
    }
    else if (this.loc == "/recipes") {
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
