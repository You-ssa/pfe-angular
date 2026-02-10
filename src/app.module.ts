import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';      // indispensable pour ngModel/ngForm
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ExplorerComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
