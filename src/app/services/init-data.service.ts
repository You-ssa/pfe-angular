import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  private readonly apiUrl = environment.apiUrl ?? '';

  private paysData: Pays[] = [
    {
      nom: 'Tunisie',
      drapeau: '🇹🇳',
      indicatif: '+216',
      villes: [
        'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana',
        'Gafsa', 'Monastir', 'Ben Arous', 'Kasserine', 'Médenine', 'Nabeul',
        'Tataouine', 'Béja', 'Jendouba', 'Mahdia', 'Siliana', 'Kef', 'Tozeur',
        'Kebili', 'Zaghouan', 'Manouba', 'Sidi Bouzid'
      ],
      phoneLength: 8
    },
    {
      nom: 'France',
      drapeau: '🇫🇷',
      indicatif: '+33',
      villes: [
        'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
        'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre',
        'Saint-Étienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne'
      ],
      phoneLength: 9
    },
    {
      nom: 'Maroc',
      drapeau: '🇲🇦',
      indicatif: '+212',
      villes: [
        'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger', 'Agadir', 'Meknès',
        'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida', 'Nador', 'Khouribga',
        'Béni Mellal', 'Khémisset', 'Mohammedia', 'Taza', 'Ksar El Kébir', 'Settat'
      ],
      phoneLength: 9
    },
    {
      nom: 'Algérie',
      drapeau: '🇩🇿',
      indicatif: '+213',
      villes: [
        'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Sétif',
        'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'Tiaret', 'Béjaïa', 'Tlemcen',
        'Ouargla', 'Skikda', 'Mostaganem', 'Tizi Ouzou', 'Médéa', 'El Oued', 'Chlef'
      ],
      phoneLength: 9
    },
    {
      nom: 'Belgique',
      drapeau: '🇧🇪',
      indicatif: '+32',
      villes: [
        'Bruxelles', 'Anvers', 'Gand', 'Charleroi', 'Liège', 'Bruges',
        'Namur', 'Louvain', 'Mons', 'Malines'
      ],
      phoneLength: 9
    },
    {
      nom: 'Canada',
      drapeau: '🇨🇦',
      indicatif: '+1',
      villes: [
        'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
        'Ottawa', 'Winnipeg', 'Quebec', 'Hamilton', 'Kitchener'
      ],
      phoneLength: 10
    },
    {
      nom: 'Suisse',
      drapeau: '🇨🇭',
      indicatif: '+41',
      villes: [
        'Zurich', 'Genève', 'Bâle', 'Lausanne', 'Berne', 'Winterthour',
        'Lucerne', 'Saint-Gall', 'Lugano', 'Bienne'
      ],
      phoneLength: 9
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Initialise les pays dans la base via l'API (bulk insert).
   */
  async initializePays(): Promise<void> {
    await firstValueFrom(
      this.http
        .post<void>(`${this.apiUrl}/api/admin/pays/init`, { pays: this.paysData })
        .pipe(catchError(this.handleError('Erreur lors de l\'initialisation des pays')))
    );
  }

  /**
   * Réinitialise les pays côté base (supprime et recrée).
   */
  async resetPays(): Promise<void> {
    await firstValueFrom(
      this.http
        .post<void>(`${this.apiUrl}/api/admin/pays/reset`, { pays: this.paysData })
        .pipe(catchError(this.handleError('Erreur lors de la réinitialisation des pays')))
    );
  }

  /**
   * Retourne le nombre de pays stockés.
   */
  async getPaysCount(): Promise<number> {
    return firstValueFrom(
      this.http
        .get<{ count: number }>(`${this.apiUrl}/api/pays/count`)
        .pipe(
          catchError(this.handleError('Erreur lors de la récupération du nombre de pays')),
          // fallback simple si la structure diffère
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // map not needed; destructuring in map would require import
        )
    ).then(res => (res as any)?.count ?? 0);
  }

  private handleError(message: string) {
    return (error: HttpErrorResponse) => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }
}
