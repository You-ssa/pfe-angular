import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- مهم جداً

interface Medecin { nom: string; specialite: string; email: string; telephone: string; }
interface Pharmacie { nom: string; ville: string; telephone: string; etat: string; }
interface Medicament { nom: string; description: string; }

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- CommonModule و FormsModule
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent {
  activeTab: string = 'medecin';

  medecinSearch = { nom: '', specialite: '', email: '', telephone: '' };
  pharmacieSearch = { nom: '', ville: '', ouverture: '' };
  medicamentSearch = { nom: '' };

  medecinResults: Medecin[] = [];
  pharmacieResults: Pharmacie[] = [];
  medicamentResults: Medicament[] = [];

  private mockMedecins: Medecin[] = [
    { nom: "Dr. Ahmed Ben Ali", specialite: "Cardiologue", email: "ahmed.benali@example.com", telephone: "+216 71 234 567" },
    { nom: "Dr. Leila Trabelsi", specialite: "Dermatologue", email: "leila.trabelsi@example.com", telephone: "+216 71 345 678" },
    { nom: "Dr. Mohamed Karim", specialite: "Généraliste", email: "mohamed.karim@example.com", telephone: "+216 71 456 789" },
    { nom: "Dr. Samia Meddeb", specialite: "Pédiatre", email: "samia.meddeb@example.com", telephone: "+216 71 567 890" }
  ];

  private mockPharmacies: Pharmacie[] = [
    { nom: "Pharmacie Centrale", ville: "Tunis", telephone: "+216 71 111 222", etat: "garde" },
    { nom: "Pharmacie de la Liberté", ville: "Tunis", telephone: "+216 71 222 333", etat: "nuit" },
    { nom: "Pharmacie El Manar", ville: "Tunis", telephone: "+216 71 333 444", etat: "jour" },
    { nom: "Pharmacie Sfax Centre", ville: "Sfax", telephone: "+216 74 444 555", etat: "garde" }
  ];

  private mockMedicaments: Medicament[] = [
    { nom: "Doliprane 1000mg", description: "Antalgique et antipyrétique à base de paracétamol." },
    { nom: "Amoxicilline 500mg", description: "Antibiotique de la famille des pénicillines." },
    { nom: "Ibuprofène 400mg", description: "Anti-inflammatoire non stéroïdien (AINS)." }
  ];

  switchTab(tab: string) { this.activeTab = tab; }
  searchMedecin() { this.medecinResults = [...this.mockMedecins]; }
  searchPharmacie() { this.pharmacieResults = [...this.mockPharmacies]; }
  searchMedicament() { this.medicamentResults = [...this.mockMedicaments]; }
}
