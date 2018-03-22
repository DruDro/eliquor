import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public auth: AuthService,
    private router: Router
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
  delete(recipe: Recipe): void {
    if (confirm(`Delete recipe ${recipe.name}?`)) {
      this.recipeService.deleteRecipe(recipe).subscribe(() => this.router.navigate(['/my-recipes']));
    }
  }
  addFlavour() {
    this.recipe.flavours.push({name:"", proportion:0});
  }
  deleteFlavour(flavourIndex:number){
    this.recipe.flavours.splice(flavourIndex, 1);
  }
  save(): void {
    this.recipe.createdAt = Date.now();    
    this.recipeService.updateRecipe(this.recipe.id, this.recipe).subscribe(recipe => alert(`Recipe ${this.recipe.name} was saved`))
  }
  goBack(): void {
    this.location.back()
  }
}
