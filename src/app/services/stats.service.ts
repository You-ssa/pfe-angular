import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Statistics {
  totalPatients: number;
  totalMedecins: number;
  totalSecretaires: number;
  demandesEnAttente: number;
  consultationsMensuelles: number;
  tauxUtilisation: number;
  nouvellesNotifications: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly apiUrl = environment.apiUrl ?? '';

  constructor(private http: HttpClient) {}

  async getStatistics(): Promise<Statistics> {
    return firstValueFrom(
      this.http
        .get<Statistics>(`${this.apiUrl}/api/admin/stats`)
        .pipe(catchError(this.handleError('Erreur récupération statistiques')))
    );
  }

  async getMedecinsList(): Promise<any[]> {
    const params = new HttpParams().set('statut', 'approuve');
    return firstValueFrom(
      this.http
        .get<any[]>(`${this.apiUrl}/api/medecins`, { params })
        .pipe(catchError(this.handleError('Erreur récupération médecins')))
    );
  }

  async getPatientsList(): Promise<any[]> {
    return firstValueFrom(
      this.http
        .get<any[]>(`${this.apiUrl}/api/patients`)
        .pipe(catchError(this.handleError('Erreur récupération patients')))
    );
  }

  private handleError(message: string) {
    return (error: HttpErrorResponse) => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }
}
