import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  motDePasse = '';
  userType: 'patient' | 'medecin' | 'secretaire' | 'admin' = 'patient';
  errorMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Gérer la connexion
   */
  async login() {
    this.errorMessage = '';
    this.isLoading = true;

    // Validation des champs
    if (!this.email || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      this.isLoading = false;
      return;
    }

    try {
      const user: User | null = await this.userService.login(
        this.email,
        this.motDePasse,
        this.userType
      );

      if (!user) {
        // Vérifier si le compte est en attente d'approbation
        if (this.userType === 'medecin' || this.userType === 'secretaire') {
          this.errorMessage = 'Email ou mot de passe incorrect, ou compte en attente d\'approbation';
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
        this.isLoading = false;
        return;
      }

      // Stocker l'utilisateur en session
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userType', user.userType);

      // Redirection selon le type d'utilisateur
      this.redirectUser(user.userType);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      this.errorMessage = 'Une erreur est survenue lors de la connexion';
      this.isLoading = false;
    }
  }

  /**
   * Rediriger l'utilisateur selon son type
   */
  private redirectUser(userType: string) {
    switch (userType) {
      case 'patient':
        this.router.navigate(['/home-user']);
        break;
      case 'medecin':
        this.router.navigate(['/home-med']);
        break;
      case 'secretaire':
        this.router.navigate(['/home-sec']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  /**
   * Naviguer vers la page d'inscription selon le type
   */
  goToRegister() {
    switch (this.userType) {
      case 'patient':
        this.router.navigate(['/register']);
        break;
      case 'medecin':
        this.router.navigate(['/register-med']);
        break;
      case 'secretaire':
        this.router.navigate(['/register-sec']);
        break;
      default:
        this.router.navigate(['/register']);
    }
  }
}