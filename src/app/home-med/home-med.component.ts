import { Component } from '@angular/core';

@Component({
  selector: 'app-home-med',
  standalone: true,
  template: `
    <div class="home-med-container">
      <h1>Accueil Médecin</h1>
      <p>Bonjour Dr {{ prenom }} !</p>
    </div>
  `,
  styles: [`
    .home-med-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #fff3e0;
    }
  `]
})
export class HomeMedComponent {
  prenom: string = '';

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.prenom = user.prenom;
    }
  }
}
