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
  // Données du formulaire
  nom = '';
  prenom = '';
  sexe = '';
  email = '';
  telephone = '';
  specialite = '';
  rpps = '';
  adresseHopital = '';
  poste = '';
  departement = '';
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

  // Liste des spécialités (même que médecin)
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
   * Inscription secrétaire
   */
  async registerSec() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation des champs
    if (!this.nom || !this.prenom || !this.sexe || !this.email || 
        !this.telephone || !this.specialite || !this.adresseHopital ||
        !this.poste || !this.departement || !this.motDePasse) {
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
        email: this.email,
        telephone: this.telephone,
        specialite: this.specialite,
        rpps: this.rpps || undefined,
        adresseHopital: this.adresseHopital,
        poste: this.poste,
        departement: this.departement,
        motDePasse: this.motDePasse,
        userType: 'secretaire',
        statut: 'en_attente',
        dateInscription: new Date().toISOString()
      };

      await this.userService.createSecretaire(user, this.photoFile);

      this.successMessage = 'Demande d\'inscription envoyée ! Votre compte sera activé après validation par l\'administrateur.';
      
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

  goToRegisterPatient() {
    this.router.navigate(['/register']);
  }

  goToRegisterMedecin() {
    this.router.navigate(['/register-med']);
  }
}