import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="welcome-container">
      <h1>Bienvenue à notre application !</h1>
      <p>Vous allez être redirigé...</p>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }
  `]
})
export class WelcomeComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/home-user']);
    }, 3000); // redirection après 3 secondes
  }
}
