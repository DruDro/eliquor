import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../Recipe';
import { RecipeService }  from '../recipe.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getRecipe();
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
  save(): void {
    this.recipeService.updateRecipe(this.recipe)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back()
  }
}
