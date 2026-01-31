import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';      // indispensable pour ngModel/ngForm
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
