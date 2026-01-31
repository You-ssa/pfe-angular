import { Component } from '@angular/core';

@Component({
  selector: 'app-home-user',
  standalone: true,
  template: `
    <div class="home-user-container">
      <h1>Accueil Utilisateur</h1>
      <p>Bonjour, {{prenom}} !</p>
    </div>
  `,
  styles: [`
    .home-user-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #e0f7fa;
    }
  `]
})
export class HomeUserComponent {
  prenom: string = '';

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.prenom = user.prenom;
    }
  }
}
