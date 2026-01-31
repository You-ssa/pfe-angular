import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

export interface Pays {
  nom: string;
  drapeau: string;
  indicatif: string;
  villes: string[];
  phoneLength: number;
}

@Injectable({
  providedIn: 'root'
})
export class InitDataService {

  private paysData: Pays[] = [
    {
      nom: 'Tunisie',
      drapeau: '🇹🇳',
      indicatif: '+216',
      villes: [
        'Tunis',
        'Sfax',
        'Sousse',
        'Kairouan',
        'Bizerte',
        'Gabès',
        'Ariana',
        'Gafsa',
        'Monastir',
        'Ben Arous',
        'Kasserine',
        'Médenine',
        'Nabeul',
        'Tataouine',
        'Béja',
        'Jendouba',
        'Mahdia',
        'Siliana',
        'Kef',
        'Tozeur',
        'Kebili',
        'Zaghouan',
        'Manouba',
        'Sidi Bouzid'
      ],
      phoneLength: 8
    },
    {
      nom: 'France',
      drapeau: '🇫🇷',
      indicatif: '+33',
      villes: [
        'Paris',
        'Marseille',
        'Lyon',
        'Toulouse',
        'Nice',
        'Nantes',
        'Strasbourg',
        'Montpellier',
        'Bordeaux',
        'Lille',
        'Rennes',
        'Reims',
        'Le Havre',
        'Saint-Étienne',
        'Toulon',
        'Grenoble',
        'Dijon',
        'Angers',
        'Nîmes',
        'Villeurbanne'
      ],
      phoneLength: 9
    },
    {
      nom: 'Maroc',
      drapeau: '🇲🇦',
      indicatif: '+212',
      villes: [
        'Casablanca',
        'Rabat',
        'Fès',
        'Marrakech',
        'Tanger',
        'Agadir',
        'Meknès',
        'Oujda',
        'Kenitra',
        'Tétouan',
        'Safi',
        'El Jadida',
        'Nador',
        'Khouribga',
        'Béni Mellal',
        'Khémisset',
        'Mohammedia',
        'Taza',
        'Ksar El Kébir',
        'Settat'
      ],
      phoneLength: 9
    },
    {
      nom: 'Algérie',
      drapeau: '🇩🇿',
      indicatif: '+213',
      villes: [
        'Alger',
        'Oran',
        'Constantine',
        'Annaba',
        'Blida',
        'Batna',
        'Sétif',
        'Sidi Bel Abbès',
        'Biskra',
        'Tébessa',
        'Tiaret',
        'Béjaïa',
        'Tlemcen',
        'Ouargla',
        'Skikda',
        'Mostaganem',
        'Tizi Ouzou',
        'Médéa',
        'El Oued',
        'Chlef'
      ],
      phoneLength: 9
    },
    {
      nom: 'Belgique',
      drapeau: '🇧🇪',
      indicatif: '+32',
      villes: [
        'Bruxelles',
        'Anvers',
        'Gand',
        'Charleroi',
        'Liège',
        'Bruges',
        'Namur',
        'Louvain',
        'Mons',
        'Malines'
      ],
      phoneLength: 9
    },
    {
      nom: 'Canada',
      drapeau: '🇨🇦',
      indicatif: '+1',
      villes: [
        'Toronto',
        'Montreal',
        'Vancouver',
        'Calgary',
        'Edmonton',
        'Ottawa',
        'Winnipeg',
        'Quebec',
        'Hamilton',
        'Kitchener'
      ],
      phoneLength: 10
    },
    {
      nom: 'Suisse',
      drapeau: '🇨🇭',
      indicatif: '+41',
      villes: [
        'Zurich',
        'Genève',
        'Bâle',
        'Lausanne',
        'Berne',
        'Winterthour',
        'Lucerne',
        'Saint-Gall',
        'Lugano',
        'Bienne'
      ],
      phoneLength: 9
    }
  ];

  constructor(private firestore: Firestore) {}

  // Initialiser tous les pays dans Firebase
  async initializePays(): Promise<void> {
    try {
      const paysRef = collection(this.firestore, 'pays');
      const snapshot = await getDocs(paysRef);
      
      console.log('📊 Vérification de la collection pays...');
      console.log('Nombre de pays existants:', snapshot.size);

      // Si la collection est vide, ajouter tous les pays
      if (snapshot.empty) {
        console.log('🚀 Initialisation des pays dans Firebase...');
        
        for (const pays of this.paysData) {
          await addDoc(paysRef, pays);
          console.log(`✅ Pays ajouté: ${pays.drapeau} ${pays.nom} (${pays.villes.length} villes)`);
        }
        
        console.log('✨ Tous les pays ont été initialisés avec succès!');
      } else {
        console.log('✅ Les pays sont déjà initialisés dans Firebase');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation des pays:', error);
      throw error;
    }
  }

  // Réinitialiser complètement les pays (supprimer et recréer)
  async resetPays(): Promise<void> {
    try {
      const paysRef = collection(this.firestore, 'pays');
      const snapshot = await getDocs(paysRef);
      
      console.log('🗑️  Suppression des pays existants...');
      
      // Supprimer tous les pays existants
      for (const docSnapshot of snapshot.docs) {
        await deleteDoc(doc(this.firestore, 'pays', docSnapshot.id));
      }
      
      console.log('✅ Tous les pays ont été supprimés');
      
      // Ajouter les nouveaux pays
      await this.initializePays();
    } catch (error) {
      console.error('❌ Erreur lors de la réinitialisation des pays:', error);
      throw error;
    }
  }

  // Obtenir les pays (pour vérification)
  async getPaysCount(): Promise<number> {
    const paysRef = collection(this.firestore, 'pays');
    const snapshot = await getDocs(paysRef);
    return snapshot.size;
  }
}