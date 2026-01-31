import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UrgenceModalComponent } from './urgence-modal/urgence-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    UrgenceModalComponent  // ✅ Import du modal standalone
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MediConnect';
  showNavbar = true;
  showFooter = true;

  @ViewChild('urgenceModal') urgenceModal!: UrgenceModalComponent;

  constructor(private router: Router) {
    // Écouter les changements de route pour masquer/afficher navbar et footer
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideOn = ['/login', '/register', '/register-med', '/register-sec', 
                       '/home-user', '/home-med', '/home-sec', '/admin'];
        this.showNavbar = !hideOn.some(path => event.url.includes(path));
        this.showFooter = !hideOn.some(path => event.url.includes(path));
      }
    });
  }

  ngOnInit() {
    console.log('✅ Application MediConnect démarrée');
  }

  /**
   * Ouvrir le modal d'urgence
   */
  openUrgence() {
    if (this.urgenceModal) {
      this.urgenceModal.openModal();
    }
  }
}