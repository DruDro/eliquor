import { Component, OnInit } from '@angular/core';
import { Recipe, Flavour } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  addRecipe: any;
  public loc: string;
  constructor(
    private recipeService: RecipeService,
    public auth: AuthService,
    private router: Router
  ) {
    this.addRecipe = this.auth.isAuthenticated && { name: "", flavours: [], authorId: this.auth.user[0].id };
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
  addFlavour() {
    this.addRecipe.flavours.push({ name: "", proportion: 0 });
  }
  deleteFlavour(flavourIndex: number) {
    this.addRecipe.flavours.splice(flavourIndex, 1);
  }
  add(): void {
    this.addRecipe.createdAt = Date.now();

    this.recipeService.addRecipe(this.addRecipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
        setTimeout(() => {
          this.drawRating();
          this.addRecipe = { id: 0, name: "", flavours: [], authorId: this.auth.user[0].id, createdAt: 0 };
        });
      });
  }
  delete(recipe: Recipe): void {
    if (confirm(`Delete recipe ${recipe.name}?`)) {
      this.recipes = this.recipes.filter(h => h !== recipe);
      this.recipeService.deleteRecipe(recipe).subscribe();
    }
  }
  sort(param) {
    switch (param) {
      case "createdAt":
        this.recipes.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "rating":
        this.recipes.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        this.recipes.sort((a, b) => {
          if (b.name < a.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        break;
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


}
