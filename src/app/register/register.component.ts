import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { PaysService, Pays } from '../services/pays.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Type d'utilisateur (pour navigation)
  userType: 'patient' | 'medecin' | 'secretaire' = 'patient';

  // Données du formulaire
  nom = '';
  prenom = '';
  email = '';
  pays = '';
  ville = '';
  telephone = '';
  motDePasse = '';
  confMotDePasse = '';
  acceptConditions = false;

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

  /**
   * Charger la liste des pays
   */
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

  /**
   * Gérer le changement de pays
   */
  onPaysChange() {
    const selectedPays = this.paysList.find(p => p.nom === this.pays);
    if (selectedPays) {
      this.villesList = selectedPays.villes || [];
      this.phonePrefix = selectedPays.indicatif;
      this.phoneHelpText = `Format: ${selectedPays.formatTel || 'XX XXX XXX'}`;
      this.ville = ''; // Reset ville
    } else {
      this.villesList = [];
      this.phonePrefix = '';
      this.phoneHelpText = '';
    }
  }

  /**
   * Inscription patient
   */
  async registerPatient() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation des champs
    if (!this.nom || !this.prenom || !this.email || !this.pays || 
        !this.ville || !this.telephone || !this.motDePasse) {
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
    if (await this.userService.emailExists(this.email, 'patient')) {
      this.errorMessage = 'Cet email est déjà utilisé';
      this.isLoading = false;
      return;
    }

    try {
      const user: User = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        pays: this.pays,
        ville: this.ville,
        telephone: this.phonePrefix + this.telephone,
        motDePasse: this.motDePasse,
        userType: 'patient',
        dateInscription: new Date().toISOString()
      };

      await this.userService.createPatient(user);

      this.successMessage = 'Compte créé avec succès ! Redirection vers la connexion...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Naviguer vers inscription médecin
   */
  goToRegisterMedecin() {
    this.router.navigate(['/register-med']);
  }

  /**
   * Naviguer vers inscription secrétaire
   */
  goToRegisterSecretaire() {
    this.router.navigate(['/register-sec']);
  }
}