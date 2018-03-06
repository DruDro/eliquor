import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeService } from './recipe.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    SearchRecipesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    RecipeService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
