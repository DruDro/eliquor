import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../Recipe';
import { RecipeService }  from '../recipe.service';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipes: Recipe[];
  recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getRecipe();
    $(document).on("input", 'input[type="range"]', function () {
      $(this).closest('.range-box').find('.range-value').html(`${this.value}%`);
    });
    $(document).on("submit", ".add-recipe-form", function (e) {
      e.preventDefault();
    })
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
  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe; 
        setTimeout(() => this.drawRating());
      });
  }
  addFlavour() {
    const flavoursBox = document.querySelector('.add-recipe-form .flavours');
    const flavourRow = document.createElement("div");
    flavourRow.className = "flavour-row";
    flavourRow.innerHTML = `<label class="input-box">
    <input class="flavourName" required /><span class="label-text">Name</span>
  </label>
  <label class="input-box range-box">
    <span class="range-value">0%</span>
    <input class="flavourProportions filled"  value="0" type="range" min="0" max="20" step="0.5" required  />
    <span class="label-text">Proportions</span>
  </label>`;
    flavoursBox.appendChild(flavourRow);
  }
  save(form, recipeId: number, recipeName: string, recipeRating: number): void {
    const authorId = this.auth.user[0].id;
    const recipe = { id: recipeId, rating: recipeRating, name: recipeName, authorId, flavours: [] };
    const flavours = document.getElementsByClassName("flavourName");
    const flavourProportions = document.getElementsByClassName("flavourProportions");
    console.log(flavourProportions);
    if (recipeName && flavours[0].value) {
      for (let i = 0; i < flavours.length; i++) {
        recipe.flavours.push({ name: flavours[i].value, proportion: flavourProportions[i].value })
      }
      this.recipeService.updateRecipe(recipeId, recipe)
        .subscribe(recipe => {
          alert("Recipe saved")
        });
    }
  }
  goBack(): void {
    this.location.back()
  }
}
