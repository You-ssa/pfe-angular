import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { User } from '../services/user.service';

@Component({
  selector: 'app-home-sec',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-sec.component.html',
  styleUrls: ['./home-sec.component.css']
})
export class HomeSecComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Récupérer l'utilisateur connecté
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      // Rediriger vers login si pas connecté
      this.router.navigate(['/login']);
    }
  }

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }
}