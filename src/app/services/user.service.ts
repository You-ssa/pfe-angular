import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

export interface User {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  userType: 'patient' | 'medecin' | 'secretaire' | 'admin';
  dateInscription: string;
  
  // Champs spécifiques patient
  pays?: string;
  ville?: string;
  
  // Champs spécifiques médecin
  sexe?: string;
  specialite?: string;
  rpps?: string;
  adresseHopital?: string;
  photoUrl?: string;
  statut?: 'en_attente' | 'approuve' | 'refuse'; // Pour validation admin
  
  // Champs spécifiques secrétaire
  poste?: string;
  departement?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  /**
   * Créer un patient (enregistré automatiquement)
   */
  async createPatient(user: User): Promise<void> {
    try {
      user.userType = 'patient';
      user.dateInscription = new Date().toISOString();
      await addDoc(collection(this.firestore, 'patients'), user);
      console.log('✅ Patient créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création patient:', error);
      throw error;
    }
  }

  /**
   * Créer un médecin (en attente d'approbation admin)
   */
  async createMedecin(user: User, photoFile?: File): Promise<void> {
    try {
      // Upload photo si fournie
      if (photoFile) {
        const fileRef = ref(this.storage, `medecins/${Date.now()}_${photoFile.name}`);
        await uploadBytes(fileRef, photoFile);
        user.photoUrl = await getDownloadURL(fileRef);
      }

      user.userType = 'medecin';
      user.statut = 'en_attente'; // 🔒 Doit être approuvé par admin
      user.dateInscription = new Date().toISOString();
      
      await addDoc(collection(this.firestore, 'medecins'), user);
      console.log('✅ Médecin créé - En attente d\'approbation');
    } catch (error) {
      console.error('❌ Erreur création médecin:', error);
      throw error;
    }
  }

  /**
   * Créer un secrétaire (en attente d'approbation admin)
   */
  async createSecretaire(user: User): Promise<void> {
    try {
      user.userType = 'secretaire';
      user.statut = 'en_attente'; // 🔒 Doit être approuvé par admin
      user.dateInscription = new Date().toISOString();
      
      await addDoc(collection(this.firestore, 'secretaires'), user);
      console.log('✅ Secrétaire créé - En attente d\'approbation');
    } catch (error) {
      console.error('❌ Erreur création secrétaire:', error);
      throw error;
    }
  }

  /**
   * Connexion utilisateur
   */
  async login(email: string, motDePasse: string, userType: string): Promise<User | null> {
    try {
      // Déterminer la collection selon le type
      let collectionName = '';
      switch (userType) {
        case 'patient':
          collectionName = 'patients';
          break;
        case 'medecin':
          collectionName = 'medecins';
          break;
        case 'secretaire':
          collectionName = 'secretaires';
          break;
        case 'admin':
          collectionName = 'admins';
          break;
        default:
          return null;
      }

      const q = query(
        collection(this.firestore, collectionName),
        where('email', '==', email)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log('❌ Aucun utilisateur trouvé');
        return null;
      }

      const userDoc = snapshot.docs[0];
      const user = userDoc.data() as User;
      user.id = userDoc.id;

      // Vérifier le mot de passe
      if (user.motDePasse !== motDePasse) {
        console.log('❌ Mot de passe incorrect');
        return null;
      }

      // Vérifier si médecin/secrétaire est approuvé
      if ((userType === 'medecin' || userType === 'secretaire') && user.statut !== 'approuve') {
        console.log('❌ Compte en attente d\'approbation');
        return null;
      }

      console.log('✅ Connexion réussie:', user.email);
      return user;
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      return null;
    }
  }

  /**
   * Vérifier si un email existe déjà
   */
  async emailExists(email: string, userType: string): Promise<boolean> {
    try {
      let collectionName = '';
      switch (userType) {
        case 'patient':
          collectionName = 'patients';
          break;
        case 'medecin':
          collectionName = 'medecins';
          break;
        case 'secretaire':
          collectionName = 'secretaires';
          break;
        default:
          return false;
      }

      const q = query(
        collection(this.firestore, collectionName),
        where('email', '==', email)
      );
      
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error('❌ Erreur vérification email:', error);
      return false;
    }
  }

  /**
   * Approuver un médecin ou secrétaire (admin uniquement)
   */
  async approuverUtilisateur(userId: string, userType: 'medecin' | 'secretaire'): Promise<void> {
    try {
      const collectionName = userType === 'medecin' ? 'medecins' : 'secretaires';
      const docRef = doc(this.firestore, collectionName, userId);
      await updateDoc(docRef, { statut: 'approuve' });
      console.log(`✅ ${userType} approuvé avec succès`);
    } catch (error) {
      console.error('❌ Erreur approbation:', error);
      throw error;
    }
  }

  /**
   * Refuser un médecin ou secrétaire (admin uniquement)
   */
  async refuserUtilisateur(userId: string, userType: 'medecin' | 'secretaire'): Promise<void> {
    try {
      const collectionName = userType === 'medecin' ? 'medecins' : 'secretaires';
      const docRef = doc(this.firestore, collectionName, userId);
      await updateDoc(docRef, { statut: 'refuse' });
      console.log(`✅ ${userType} refusé`);
    } catch (error) {
      console.error('❌ Erreur refus:', error);
      throw error;
    }
  }

  /**
   * Récupérer tous les utilisateurs en attente (admin uniquement)
   */
  async getUtilisateursEnAttente(userType: 'medecin' | 'secretaire'): Promise<User[]> {
    try {
      const collectionName = userType === 'medecin' ? 'medecins' : 'secretaires';
      const q = query(
        collection(this.firestore, collectionName),
        where('statut', '==', 'en_attente')
      );
      
      const snapshot = await getDocs(q);
      const utilisateurs: User[] = [];
      
      snapshot.forEach(doc => {
        const user = doc.data() as User;
        user.id = doc.id;
        utilisateurs.push(user);
      });
      
      return utilisateurs;
    } catch (error) {
      console.error('❌ Erreur récupération utilisateurs en attente:', error);
      return [];
    }
  }
}