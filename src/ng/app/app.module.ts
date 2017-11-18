import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { HttpModule } from '@angular/http';
>>>>>>> ng-authentication

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
=======
import { AuthModule } from './auth/auth.module'
>>>>>>> ng-authentication
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    HttpClientModule,
=======
    HttpModule,
>>>>>>> ng-authentication
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
