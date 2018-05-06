import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    // const token = this.authService.getToken();
    /*
    return this.http.put('https://ng-recipe-book-fad15.firebaseio.com/recipes.json', this.recipeService.getRecipes(),{
      // observe: 'events'
      observe: 'body',
      params: new HttpParams().set('auth', token)
    });
    */
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-fad15.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true}); // , params: new HttpParams().set('auth', token)
      return this.http.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // this.http.get<Recipe[]>('https://ng-recipe-book-fad15.firebaseio.com/recipes.json?auth=' + token)
    this.http.get<Recipe[]>('https://ng-recipe-book-fad15.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
        console.log(recipes);

          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;


        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
