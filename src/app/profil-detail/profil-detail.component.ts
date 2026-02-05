import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../services/user.service';

@Component({
  selector: 'app-profil-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css']
})
export class ProfilDetailComponent {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() approve = new EventEmitter<User>();
  @Output() reject = new EventEmitter<User>();

  /**
   * Fermer le modal
   */
  closeModal() {
    this.close.emit();
  }

  /**
   * Approuver l'utilisateur
   */
  onApprove() {
    if (this.user) {
      this.approve.emit(this.user);
    }
  }

  /**
   * Refuser l'utilisateur
   */
  onReject() {
    if (this.user) {
      this.reject.emit(this.user);
    }
  }

  /**
   * Obtenir l'icône selon le type d'utilisateur
   */
  getUserIcon(): string {
    if (!this.user) return 'fas fa-user';
    return this.user.userType === 'medecin' ? 'fas fa-user-md' : 'fas fa-user-tie';
  }

  /**
   * Formater une date
   */
  formatDate(dateString: string): string {
    if (!dateString) return 'Date inconnue';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Erreur formatage date:', error);
      return 'Date invalide';
    }
  }
}