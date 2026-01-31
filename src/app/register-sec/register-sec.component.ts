import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register-sec',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-sec.component.html',
  styleUrls: ['./register-sec.component.css']
})
export class RegisterSecComponent {
  // Type d'utilisateur (pour navigation)
  userType: 'patient' | 'medecin' | 'secretaire' = 'secretaire';

  // Données du formulaire
  nom = '';
  prenom = '';
  sexe = '';
  poste = '';
  departement = '';
  email = '';
  telephone = '';
  motDePasse = '';
  confMotDePasse = '';
  acceptConditions = false;

  // Messages
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  // Liste des postes
  postes = [
    'Secrétaire médical(e)',
    'Secrétaire administratif(ve)',
    'Assistant(e) médical(e)',
    'Gestionnaire de cabinet',
    'Responsable accueil',
    'Autre'
  ];

  // Liste des départements
  departements = [
    'Accueil',
    'Cardiologie',
    'Chirurgie',
    'Consultation',
    'Dermatologie',
    'Gynécologie',
    'Pédiatrie',
    'Radiologie',
    'Urgences',
    'Administration',
    'Autre'
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Inscription secrétaire
   */
  async registerSec() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation des champs
    if (!this.nom || !this.prenom || !this.sexe || !this.poste || 
        !this.departement || !this.email || !this.telephone || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      this.isLoading = false;
      return;
    }

    // Validation des mots de passe
    if (this.motDePasse !== this.confMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.isLoading = false;
      return;
    }

    // Validation des conditions
    if (!this.acceptConditions) {
      this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
      this.isLoading = false;
      return;
    }

    // Vérifier si l'email existe déjà
    if (await this.userService.emailExists(this.email, 'secretaire')) {
      this.errorMessage = 'Cet email est déjà utilisé';
      this.isLoading = false;
      return;
    }

    try {
      const user: User = {
        nom: this.nom,
        prenom: this.prenom,
        sexe: this.sexe,
        poste: this.poste,
        departement: this.departement,
        email: this.email,
        telephone: this.telephone,
        motDePasse: this.motDePasse,
        userType: 'secretaire',
        statut: 'en_attente',
        dateInscription: new Date().toISOString()
      };

      // Créer le secrétaire
      await this.userService.createSecretaire(user);

      this.successMessage = 'Demande d\'inscription envoyée ! Votre compte sera activé après validation par l\'administrateur. Vous recevrez un email de confirmation.';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);

    } catch (error) {
      console.error('Erreur lors de l\'inscription secrétaire:', error);
      this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Naviguer vers inscription patient
   */
  goToRegisterPatient() {
    this.router.navigate(['/register']);
  }

  /**
   * Naviguer vers inscription médecin
   */
  goToRegisterMedecin() {
    this.router.navigate(['/register-med']);
  }
}