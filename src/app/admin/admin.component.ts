import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeTab: 'medecins' | 'secretaires' | 'admins' = 'medecins';
  
  medecinsEnAttente: User[] = [];
  secretairesEnAttente: User[] = [];
  
  newAdmin = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confMotDePasse: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Vérifier si l'utilisateur est admin
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }

    await this.loadMedecinsEnAttente();
  }

  async loadMedecinsEnAttente() {
    this.medecinsEnAttente = await this.userService.getUtilisateursEnAttente('medecin');
  }

  async loadSecretairesEnAttente() {
    this.secretairesEnAttente = await this.userService.getUtilisateursEnAttente('secretaire');
  }

  async approuverMedecin(id: string) {
    try {
      await this.userService.approuverUtilisateur(id, 'medecin');
      await this.loadMedecinsEnAttente();
      alert('Médecin approuvé avec succès !');
    } catch (error) {
      console.error('Erreur approbation médecin:', error);
      alert('Erreur lors de l\'approbation');
    }
  }

  async refuserMedecin(id: string) {
    if (confirm('Êtes-vous sûr de vouloir refuser ce médecin ?')) {
      try {
        await this.userService.refuserUtilisateur(id, 'medecin');
        await this.loadMedecinsEnAttente();
        alert('Médecin refusé');
      } catch (error) {
        console.error('Erreur refus médecin:', error);
        alert('Erreur lors du refus');
      }
    }
  }

  async approuverSecretaire(id: string) {
    try {
      await this.userService.approuverUtilisateur(id, 'secretaire');
      await this.loadSecretairesEnAttente();
      alert('Secrétaire approuvé(e) avec succès !');
    } catch (error) {
      console.error('Erreur approbation secrétaire:', error);
      alert('Erreur lors de l\'approbation');
    }
  }

  async refuserSecretaire(id: string) {
    if (confirm('Êtes-vous sûr de vouloir refuser ce/cette secrétaire ?')) {
      try {
        await this.userService.refuserUtilisateur(id, 'secretaire');
        await this.loadSecretairesEnAttente();
        alert('Secrétaire refusé(e)');
      } catch (error) {
        console.error('Erreur refus secrétaire:', error);
        alert('Erreur lors du refus');
      }
    }
  }

  async ajouterAdmin() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation
    if (!this.newAdmin.nom || !this.newAdmin.prenom || !this.newAdmin.email || 
        !this.newAdmin.telephone || !this.newAdmin.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      this.isLoading = false;
      return;
    }

    if (this.newAdmin.motDePasse !== this.newAdmin.confMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      this.isLoading = false;
      return;
    }

    // Vérifier si l'email existe
    if (await this.userService.emailExists(this.newAdmin.email, 'admin')) {
      this.errorMessage = 'Cet email est déjà utilisé';
      this.isLoading = false;
      return;
    }

    try {
      const admin: User = {
        nom: this.newAdmin.nom,
        prenom: this.newAdmin.prenom,
        email: this.newAdmin.email,
        telephone: this.newAdmin.telephone,
        motDePasse: this.newAdmin.motDePasse,
        userType: 'admin',
        dateInscription: new Date().toISOString()
      };

      await this.userService.createAdmin(admin);

      this.successMessage = 'Administrateur créé avec succès !';
      
      // Reset form
      this.newAdmin = {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        motDePasse: '',
        confMotDePasse: ''
      };

    } catch (error) {
      console.error('Erreur création admin:', error);
      this.errorMessage = 'Erreur lors de la création';
    } finally {
      this.isLoading = false;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }
}