import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { RecipesComponent }      from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { LoginComponent }        from './login/login.component';
import { RegisterComponent }        from './register/register.component';
import { AccountComponent }        from './account/account.component';
import { DashboardComponent }    from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent },
  { path: 'my-recipes', component: RecipesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'detail/:id', component: RecipeDetailComponent },
  { path: 'calculator/:id', component: CalculatorComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}