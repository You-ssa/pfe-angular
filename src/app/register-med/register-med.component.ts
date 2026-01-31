import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-register-med',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-med.component.html',
  styleUrls: ['./register-med.component.css']
})
export class RegisterMedComponent {
  // Type d'utilisateur (pour navigation)
  userType: 'patient' | 'medecin' | 'secretaire' = 'medecin';

  // Données du formulaire
  nom = '';
  prenom = '';
  sexe = '';
  specialite = '';
  rpps = '';
  adresseHopital = '';
  email = '';
  telephone = '';
  motDePasse = '';
  confMotDePasse = '';
  acceptConditions = false;

  // Photo
  photoFile?: File;
  photoPreview?: string;

  // Messages
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  // Liste des spécialités médicales
  specialites = [
    'Médecine générale',
    'Cardiologie',
    'Dermatologie',
    'Endocrinologie',
    'Gastro-entérologie',
    'Gériatrie',
    'Gynécologie',
    'Néphrologie',
    'Neurologie',
    'Ophtalmologie',
    'ORL',
    'Pédiatrie',
    'Pneumologie',
    'Psychiatrie',
    'Radiologie',
    'Rhumatologie',
    'Urologie',
    'Chirurgie générale',
    'Anesthésie',
    'Autre'
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: Storage
  ) {}

  /**
   * Gérer la sélection de photo
   */
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      
      // Prévisualisation
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  /**
   * Inscription médecin
   */
  async registerMed() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation des champs
    if (!this.nom || !this.prenom || !this.sexe || !this.specialite || 
        !this.rpps || !this.adresseHopital || !this.email || 
        !this.telephone || !this.motDePasse) {
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

    // Validation du RPPS (11 chiffres)
    if (!/^\d{11}$/.test(this.rpps)) {
      this.errorMessage = 'Le numéro RPPS doit contenir exactement 11 chiffres';
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
    if (await this.userService.emailExists(this.email, 'medecin')) {
      this.errorMessage = 'Cet email est déjà utilisé';
      this.isLoading = false;
      return;
    }

    try {
      const user: User = {
        nom: this.nom,
        prenom: this.prenom,
        sexe: this.sexe,
        specialite: this.specialite,
        rpps: this.rpps,
        adresseHopital: this.adresseHopital,
        email: this.email,
        telephone: this.telephone,
        motDePasse: this.motDePasse,
        userType: 'medecin',
        statut: 'en_attente',
        dateInscription: new Date().toISOString()
      };

      // Créer le médecin (avec photo si fournie)
      await this.userService.createMedecin(user, this.photoFile);

      this.successMessage = 'Demande d\'inscription envoyée ! Votre compte sera activé après validation par l\'administrateur. Vous recevrez un email de confirmation.';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);

    } catch (error) {
      console.error('Erreur lors de l\'inscription médecin:', error);
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
   * Naviguer vers inscription secrétaire
   */
  goToRegisterSecretaire() {
    this.router.navigate(['/register-sec']);
  }
}