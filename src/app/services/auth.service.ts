import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';
  private readonly ROLE_KEY = 'userType';

  constructor(private router: Router) {}

  /**
   * Sauvegarder la session après login
   */
  saveSession(user: User, token?: string) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ROLE_KEY, user.userType);
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  /**
   * Récupérer utilisateur courant
   */
  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Récupérer le rôle
   */
  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  /**
   * Récupérer le token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Vérifier si connecté
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifier accès par rôle
   */
  hasRole(...roles: string[]): boolean {
    const role = this.getUserRole();
    return role ? roles.includes(role) : false;
  }
}
