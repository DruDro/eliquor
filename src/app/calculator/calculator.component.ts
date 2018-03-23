import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  recipe: Recipe;
  amount: number = 100;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private recipeService: RecipeService
  ) { }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe; 
      });
  }
  ngOnInit() {
    this.getRecipe();
  }

  goBack(): void {
    this.location.back()
  }
}
