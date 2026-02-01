import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { User } from '../services/user.service';

@Component({
  selector: 'app-init-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './init-admin.component.html',
  styleUrl: './init-admin.component.css' // ⚠️ Changé de styleUrls à styleUrl (Angular standalone)
})
export class InitAdminComponent implements OnInit {
  adminExists = false;
  created = false;
  
  adminEmail = 'admin@votresite.com';
  adminPassword = 'Admin123!';
  adminNom = 'Admin';
  adminPrenom = 'Principal';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.checkAdminExists();
  }

  /**
   * Vérifier si un administrateur existe déjà
   */
  async checkAdminExists() {
    try {
      const snapshot = await getDocs(collection(this.firestore, 'admins'));
      this.adminExists = !snapshot.empty;
      
      if (this.adminExists) {
        console.log('✅ Un administrateur existe déjà');
      } else {
        console.log('⚠️ Aucun administrateur trouvé - Créez-en un');
      }
    } catch (error) {
      console.error('❌ Erreur vérification admin:', error);
    }
  }

  /**
   * Créer le premier administrateur
   */
  async createFirstAdmin() {
    try {
      // Validation basique
      if (!this.adminEmail || !this.adminPassword || !this.adminNom || !this.adminPrenom) {
        alert('Veuillez remplir tous les champs');
        return;
      }

      if (this.adminPassword.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }

      const admin: User = {
        nom: this.adminNom,
        prenom: this.adminPrenom,
        email: this.adminEmail,
        telephone: '+216 00 000 000', // Téléphone par défaut
        motDePasse: this.adminPassword,
        userType: 'admin',
        dateInscription: new Date().toISOString()
      };

      await addDoc(collection(this.firestore, 'admins'), admin);
      this.created = true;
      this.adminExists = true;
      
      console.log('✅ Premier administrateur créé avec succès');
      console.log('📧 Email:', this.adminEmail);
      console.log('🔑 Mot de passe:', this.adminPassword);
      
    } catch (error) {
      console.error('❌ Erreur création admin:', error);
      alert('Erreur lors de la création de l\'administrateur');
    }
  }
}