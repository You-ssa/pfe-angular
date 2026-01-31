import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterMedComponent } from './register-med/register-med.component';
import { RegisterSecComponent } from './register-sec/register-sec.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeMedComponent } from './home-med/home-med.component';
import { HomeSecComponent } from './home-sec/home-sec.component';

export const routes: Routes = [
  // Page d'accueil
  { path: '', component: AccueilComponent },
  
  // Pages publiques
  { path: 'explorer', component: ExplorerComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'welcome', component: WelcomeComponent },
  
  // Authentification
  { path: 'login', component: LoginComponent },
  
  // Inscriptions
  { path: 'register', component: RegisterComponent },          // Patient
  { path: 'register-med', component: RegisterMedComponent },   // Médecin
  { path: 'register-sec', component: RegisterSecComponent },   // Secrétaire
  
  // Espaces utilisateurs (protégés - à ajouter guards plus tard)
  { path: 'home-user', component: HomeUserComponent },         // Patient
  { path: 'home-med', component: HomeMedComponent },           // Médecin
  { path: 'home-sec', component: HomeSecComponent },           // Secrétaire
  
  // Admin (à créer)
  // { path: 'admin', component: AdminComponent },
  
  // Redirection 404
  { path: '**', redirectTo: '' }
];