import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { PaysService, Pays } from '../services/pays.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Formulaire multi-étapes
  currentStep = 1;
  totalSteps = 3;

  // Données du formulaire
  nom = '';
  prenom = '';
  sexe = '';
  email = '';
  pays = '';
  ville = '';
  telephone = '';
  motDePasse = '';
  confMotDePasse = '';
  acceptConditions = false;

  // Photo
  photoFile?: File;
  photoPreview?: string;

  // Listes pour les sélections
  paysList: Pays[] = [];
  villesList: string[] = [];
  
  // Données téléphone
  phonePrefix = '';
  phoneHelpText = '';

  // Messages
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  dataLoading = true;

  constructor(
    private userService: UserService,
    private paysService: PaysService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadPays();
  }

  // Charger la liste des pays
  async loadPays() {
    try {
      this.dataLoading = true;
      this.paysList = await this.paysService.getPays();
      console.log(`✅ ${this.paysList.length} pays chargés`);
    } catch (error) {
      console.error('❌ Erreur chargement pays:', error);
      this.errorMessage = 'Erreur lors du chargement des données';
    } finally {
      this.dataLoading = false;
    }
  }

  // Étapes
  nextStep() {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  // Gérer le changement de pays
  onPaysChange() {
    const selectedPays = this.paysList.find(p => p.nom === this.pays);
    if (selectedPays) {
      this.villesList = selectedPays.villes || [];
      this.phonePrefix = selectedPays.indicatif;
      this.phoneHelpText = `Format: ${selectedPays.formatTel || 'XX XXX XXX'}`;
      this.ville = '';
    } else {
      this.villesList = [];
      this.phonePrefix = '';
      this.phoneHelpText = '';
    }
  }

  // Gérer la sélection de photo
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.photoPreview = e.target.result;
      reader.readAsDataURL(this.photoFile);
    }
  }

  // Inscription patient
  async registerPatient() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (!this.nom || !this.prenom || !this.sexe || !this.email || !this.pays || 
        !this.ville || !this.telephone || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      this.isLoading = false;
      return;
    }

    if (this.motDePasse !== this.confMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.isLoading = false;
      return;
    }

    if (!this.acceptConditions) {
      this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
      this.isLoading = false;
      return;
    }

    if (await this.userService.emailExists(this.email, 'patient')) {
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
        pays: this.pays,
        ville: this.ville,
        telephone: this.phonePrefix + this.telephone,
        motDePasse: this.motDePasse,
        userType: 'patient',
        dateInscription: new Date().toISOString()
      };

      await this.userService.createPatient(user, this.photoFile);

      this.successMessage = 'Compte créé avec succès ! Redirection vers la connexion...';
      setTimeout(() => this.router.navigate(['/login']), 2000);

    } catch (error) {
      const msg = (error as HttpErrorResponse)?.error?.message || 'Une erreur est survenue lors de l\'inscription';
      this.errorMessage = msg;
    } finally {
      this.isLoading = false;
    }
  }

  goToRegisterMedecin() {
    this.router.navigate(['/register-med']);
  }

  goToRegisterSecretaire() {
    this.router.navigate(['/register-sec']);
  }
}
