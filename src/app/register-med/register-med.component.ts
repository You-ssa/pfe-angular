import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register-med',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-med.component.html',
  styleUrls: ['./register-med.component.css']
})
export class RegisterMedComponent {

  userType: 'patient' | 'medecin' | 'secretaire' = 'medecin';

  // Form fields
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

  // UI state
  errorMessage = '';
  successMessage = '';
  isLoading = false;

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

  currentStep = 1;
  totalSteps = 3;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  async registerMed() {
    if (this.isLoading) return;

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Champs obligatoires
    if (!this.nom || !this.prenom || !this.sexe || !this.specialite ||
        !this.rpps || !this.adresseHopital || !this.email ||
        !this.telephone || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      this.isLoading = false;
      return;
    }

    // Téléphone obligatoire (important pour la BD)
    if (!this.telephone.trim()) {
      this.errorMessage = 'Le téléphone est obligatoire';
      this.isLoading = false;
      return;
    }

    // Mots de passe
    if (this.motDePasse !== this.confMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.isLoading = false;
      return;
    }

    // RPPS
    if (!/^\d{11}$/.test(this.rpps)) {
      this.errorMessage = 'Le numéro RPPS doit contenir exactement 11 chiffres';
      this.isLoading = false;
      return;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      this.isLoading = false;
      return;
    }

    // Conditions
    if (!this.acceptConditions) {
      this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
      this.isLoading = false;
      return;
    }

    // Vérification email existant
    try {
      const exists = await this.userService.emailExists(this.email, 'medecin');
      if (exists) {
        this.errorMessage = 'Cet email est déjà utilisé';
        this.isLoading = false;
        return;
      }
    } catch {
      this.errorMessage = 'Erreur lors de la vérification de l’email';
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

      await this.userService.createMedecin(user, this.photoFile);

      this.successMessage =
        'Demande envoyée avec succès. Votre compte sera activé après validation.';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);

    } catch (error: any) {
      console.error('Erreur inscription médecin:', error);
      this.errorMessage =
        error?.error?.message || 'Erreur lors de l’inscription';
    } finally {
      this.isLoading = false;
    }
  }

  goToRegisterPatient() {
    this.router.navigate(['/register']);
  }

  goToRegisterSecretaire() {
    this.router.navigate(['/register-sec']);
  }
}
