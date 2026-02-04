import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css']
})
export class AProposComponent implements OnInit, AfterViewInit, OnDestroy {

  stats = [
    { icon: '🏥', number: 39, label: 'Services', target: 39 },
    { icon: '🛏️', number: 888, label: 'Lits', target: 888 },
    { icon: '👨‍⚕️', number: 1948, label: 'Collaborateurs', target: 1948 },
    { icon: '🔬', number: 5, label: 'Laboratoires', target: 5 }
  ];

  heroStats = [
    { number: '1910', label: 'Fondation' },
    { number: '888', label: 'Lits' },
    { number: '39', label: 'Services' },
    { number: '1,948', label: 'Professionnels' }
  ];

  timeline = [
    {
      year: '1910',
      title: 'Fondation & Ouverture',
      description: 'Construit par des citoyens bénévoles de la région, l\'hôpital ouvre ses portes comme hôpital auxiliaire offrant des soins de première ligne à la population locale.'
    },
    {
      year: '1964',
      title: 'Hôpital de Circonscription',
      description: 'Transformation majeure d\'un simple dispensaire local en un hôpital de circonscription, marquant le début de l\'expansion des services médicaux offerts.'
    },
    {
      year: '1968',
      title: 'Hôpital Régional',
      description: 'Obtention de la dénomination d\'hôpital régional avec l\'amélioration des spécialités existantes et l\'ajout de services essentiels : chirurgie, gynécologie-obstétrique et pédiatrie.'
    },
    {
      year: '1983',
      title: 'Centre Hospitalo-Universitaire',
      description: 'À la suite de la création de la faculté de médecine de Monastir, l\'hôpital obtient la vocation hospitalo-universitaire, devenant un centre de formation et de recherche médicale.'
    },
    {
      year: '1994',
      title: 'Établissement Public de Santé',
      description: 'Reclassement en établissement public de santé selon la loi n° 93-116 du 22 novembre 1993, dans le cadre de la réforme hospitalière nationale.'
    },
    {
      year: '2010',
      title: 'Centenaire',
      description: 'Célébration du centenaire de l\'hôpital, marquant 100 ans d\'excellence médicale et d\'engagement continu au service de la santé publique en Tunisie.'
    }
  ];

  services = [
    { icon: '❤️', type: 'Cardiologie', name: 'Cardiologie A et B', site: 'site1' },
    { icon: '🧠', type: 'Neurologie', name: 'Neurologie & Neurochirurgie', site: 'site1' },
    { icon: '👶', type: 'Pédiatrie', name: 'Pédiatrie & Chirurgie Pédiatrique', site: 'site1' },
    { icon: '🤰', type: 'Maternité', name: 'Maternité & Néonatalogie', site: 'site2' },
    { icon: '🔪', type: 'Chirurgie', name: 'Chirurgie Générale', site: 'site1' },
    { icon: '👁️', type: 'Ophtalmologie', name: 'Ophtalmologie', site: 'site1' },
    { icon: '🦴', type: 'Orthopédie', name: 'Orthopédie & Traumatologie', site: 'site1' },
    { icon: '🫁', type: 'Pneumologie', name: 'Pneumologie', site: 'site1' },
    { icon: '💊', type: 'Néphrologie', name: 'Néphrologie', site: 'site1' },
    { icon: '🩺', type: 'Médecine Interne', name: 'Médecine Interne & Endocrinologie', site: 'site1' },
    { icon: '🦷', type: 'Stomatologie', name: 'Stomatologie', site: 'site1' },
    { icon: '🦠', type: 'Maladies Infectieuses', name: 'Maladies Infectieuses', site: 'site1' },
    { icon: '👂', type: 'ORL', name: 'Oto-Rhino-Laryngologie', site: 'site1' },
    { icon: '🫀', type: 'Urologie', name: 'Urologie & Bio-Urologie', site: 'site1' },
    { icon: '🔥', type: 'Urgences', name: 'Service d\'Urgences 24/7', site: 'site1' },
    { icon: '💉', type: 'Réanimation', name: 'Réanimation Polyvalente', site: 'site1' }
  ];

  laboratories = [
    { icon: '🧪', name: 'Laboratoire de Biochimie' },
    { icon: '🔬', name: 'Bactériologie-Parasitologie-Immunologie' },
    { icon: '🧬', name: 'Laboratoire d\'Anatomopathologie' },
    { icon: '🩸', name: 'Laboratoire d\'Hématologie' },
    { icon: '💉', name: 'Banque du Sang' },
    { icon: '🧫', name: 'Biologie de la Reproduction & Cytogénétique' }
  ];

  certifications = [
    { icon: '🏥', name: 'Établissement Public de Santé' },
    { icon: '🎓', name: 'Centre Hospitalo-Universitaire' },
    { icon: '🔬', name: 'Centre de Recherche Médicale' },
    { icon: '✅', name: 'Agrément Ministère de la Santé' },
    { icon: '🏆', name: 'Pilier de l\'Infrastructure Nationale' },
    { icon: '📋', name: 'Personnalité Morale & Autonomie Financière' }
  ];

  activeTab = 'all';
  filteredServices = this.services;
  
  // Observers pour le nettoyage
  private scrollObserver: IntersectionObserver | null = null;
  private statsObserver: IntersectionObserver | null = null;
  private quickNavObserver: IntersectionObserver | null = null;
  
  // Propriété pour la carte Leaflet
  private map: any = null;
  private marker: any = null;

  ngOnInit() {
    this.createParticles();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initScrollReveal();
      this.initStatsAnimation();
      this.initQuickNav();
      this.initMap(); // Initialiser la carte
    }, 100);
  }

  ngOnDestroy() {
    // Nettoyage des observers
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    if (this.statsObserver) {
      this.statsObserver.disconnect();
    }
    if (this.quickNavObserver) {
      this.quickNavObserver.disconnect();
    }
    
    // Nettoyage de la carte Leaflet
    if (this.map) {
      this.map.remove();
    }
    
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  createParticles() {
    // Particles are created via CSS animations
  }

  filterServices(tab: string) {
    this.activeTab = tab;
    if (tab === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(s => s.site === tab);
    }
    
    // Animation de révélation après le filtrage
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  initScrollReveal() {
    // Détruire l'observateur existant s'il y en a un
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      // Réinitialiser l'état
      el.classList.remove('revealed');
      this.scrollObserver?.observe(el);
    });
  }

  initStatsAnimation() {
    const animateValue = (element: HTMLElement, start: number, end: number, duration: number): Promise<void> => {
      return new Promise<void>((resolve) => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          element.textContent = value.toLocaleString('fr-FR');
          
          // Ajouter une classe pendant l'animation
          if (progress < 1) {
            element.classList.add('animating');
            window.requestAnimationFrame(step);
          } else {
            element.classList.remove('animating');
            element.classList.add('animated');
            resolve();
          }
        };
        window.requestAnimationFrame(step);
      });
    };

    // Détruire l'observateur existant
    if (this.statsObserver) {
      this.statsObserver.disconnect();
    }

    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const numberEls = entry.target.querySelectorAll('.stat-number');
          const animations: Promise<void>[] = [];
          
          numberEls.forEach((el: Element, index: number) => {
            const htmlEl = el as HTMLElement;
            const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
            
            // Réinitialiser l'état
            htmlEl.textContent = '0';
            htmlEl.classList.remove('animated', 'animating');
            
            // Démarrer l'animation avec un délai différent pour chaque élément
            const delay = index * 200;
            setTimeout(() => {
              animations.push(animateValue(htmlEl, 0, targetValue, 1500));
            }, delay);
          });

          // Attendre que toutes les animations soient terminées
          await Promise.all(animations);
          this.statsObserver?.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.stats-container').forEach(section => {
      this.statsObserver?.observe(section);
    });
  }

  initQuickNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.quick-nav a');

    // Supprimer l'ancien écouteur d'événements
    window.removeEventListener('scroll', this.handleScroll.bind(this));

    // Créer un observer pour détecter la section active
    this.quickNavObserver = new IntersectionObserver((entries) => {
      let current = '';
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          current = entry.target.id;
        }
      });

      // Mettre à jour les liens actifs
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === '' && href === '#hero')) {
          link.classList.add('active');
        }
      });

      // Afficher/masquer la navigation rapide
      const quickNav = document.querySelector('.quick-nav');
      if (window.scrollY > 300) {
        quickNav?.classList.add('visible');
      } else {
        quickNav?.classList.remove('visible');
      }
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -70% 0px'
    });

    // Observer chaque section
    sections.forEach(section => {
      this.quickNavObserver?.observe(section);
    });

    // Ajouter l'écouteur de scroll pour l'affichage/masquage
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll() {
    const quickNav = document.querySelector('.quick-nav');
    if (window.scrollY > 300) {
      quickNav?.classList.add('visible');
    } else {
      quickNav?.classList.remove('visible');
    }
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      // Calculer la position avec offset pour la navigation fixe
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Animation de feedback sur la navigation
      const navLink = event.target as HTMLElement;
      navLink.classList.add('clicked');
      setTimeout(() => {
        navLink.classList.remove('clicked');
      }, 300);
      
      // Mettre à jour le lien actif
      document.querySelectorAll('.quick-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  }

  // ========== MÉTHODES POUR LA CARTE ==========

  initMap() {
    try {
      // Attendre que le DOM soit prêt
      setTimeout(() => {
        const mapElement = document.getElementById('map');
        
        if (!mapElement) {
          console.error('Élément map non trouvé');
          this.showFallbackMap();
          return;
        }

        // Charger Leaflet dynamiquement
        this.loadLeaflet().then(() => {
          // Coordonnées du CHU Fattouma-Bourguiba
          const chuCoords: [number, number] = [35.7770, 10.8268];
          
          // Initialiser la carte
          this.map = (window as any).L.map('map', {
            center: chuCoords,
            zoom: 16,
            zoomControl: true,
            scrollWheelZoom: true
          });
          
          // Ajouter les tuiles OpenStreetMap
          (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
          }).addTo(this.map);
          
          // Créer une icône personnalisée
          const hospitalIcon = (window as any).L.divIcon({
            className: 'hospital-marker',
            html: `
              <div style="
                position: relative;
                width: 50px;
                height: 50px;
              ">
                <div style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 50px;
                  height: 50px;
                  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid white;
                  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
                  z-index: 2;
                  animation: pulse 2s infinite;
                ">
                  <span style="
                    font-size: 20px;
                    color: white;
                  ">
                    🏥
                  </span>
                </div>
              </div>
            `,
            iconSize: [50, 50],
            iconAnchor: [25, 50]
          });
          
          // Ajouter le marqueur
          this.marker = (window as any).L.marker(chuCoords, { 
            icon: hospitalIcon,
            title: 'CHU Fattouma-Bourguiba'
          }).addTo(this.map);
          
          // Bind popup
          this.marker.bindPopup(`
            <div style="min-width: 250px; font-family: 'Segoe UI', sans-serif;">
              <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 1.2rem;">
                🏥 CHU Fattouma-Bourguiba
              </h3>
              <p style="margin: 0 0 10px 0; color: #4b5563; font-size: 0.95rem;">
                <strong>📍 Adresse:</strong><br>
                Avenue Farhat-Hached et rue du 1er-Juin 1995<br>
                5000 Monastir, Tunisie
              </p>
              <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 0.95rem;">
                <strong>📞 Téléphone:</strong><br>
                (+216) 73 462 600
              </p>
              <div style="display: flex; gap: 10px;">
                <a href="https://maps.google.com/?q=35.7770,10.8268" 
                   target="_blank"
                   style="
                     flex: 1;
                     background: #3b82f6;
                     color: white;
                     padding: 8px 12px;
                     border-radius: 6px;
                     text-decoration: none;
                     font-size: 0.85rem;
                     text-align: center;
                     transition: all 0.3s;
                   "
                   onmouseover="this.style.background='#2563eb'"
                   onmouseout="this.style.background='#3b82f6'">
                  📍 Google Maps
                </a>
                <a href="https://waze.com/ul?ll=35.7770,10.8268&navigate=yes" 
                   target="_blank"
                   style="
                     flex: 1;
                     background: #10b981;
                     color: white;
                     padding: 8px 12px;
                     border-radius: 6px;
                     text-decoration: none;
                     font-size: 0.85rem;
                     text-align: center;
                     transition: all 0.3s;
                   "
                   onmouseover="this.style.background='#0da271'"
                   onmouseout="this.style.background='#10b981'">
                  🚗 Waze
                </a>
              </div>
            </div>
          `).openPopup();
          
          // Forcer le redimensionnement de la carte
          setTimeout(() => {
            if (this.map) {
              this.map.invalidateSize();
            }
          }, 300);
          
          // Ajouter le CSS pour les animations
          this.addMarkerAnimations();
          
        }).catch(error => {
          console.error('Erreur lors du chargement de Leaflet:', error);
          this.showFallbackMap();
        });
        
      }, 500);
      
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      this.showFallbackMap();
    }
  }

  // Méthode pour charger Leaflet dynamiquement
  private loadLeaflet(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Vérifier si Leaflet est déjà chargé
      if ((window as any).L) {
        resolve();
        return;
      }
      
      // Charger le CSS de Leaflet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
      
      // Charger le JS de Leaflet
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Échec du chargement de Leaflet'));
      document.head.appendChild(script);
    });
  }

  // Méthode pour ajouter les animations CSS
  private addMarkerAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      .leaflet-popup-content {
        margin: 15px !important;
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2) !important;
        border: 1px solid #e5e7eb !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Ouvrir dans Google Maps
  openGoogleMaps() {
    const url = `https://www.google.com/maps?q=CHU+Fattouma-Bourguiba,+Avenue+Farhat-Hached,+Monastir,+Tunisie&ll=35.7770,10.8268&z=16`;
    window.open(url, '_blank');
  }

  // Obtenir l'itinéraire
  getDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=CHU+Fattouma+Bourguiba,+Avenue+Farhat-Hached,+Monastir,+Tunisie`;
    window.open(url, '_blank');
  }

  // Recentrer la carte
  resetMapView() {
    if (this.map) {
      this.map.setView([35.7770, 10.8268], 16);
      this.marker.openPopup();
    }
  }

  // Méthode de secours si Leaflet échoue
  private showFallbackMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
        ">
          <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 400px;
          ">
            <div style="font-size: 3rem; margin-bottom: 20px; color: #3b82f6;">
              🗺️
            </div>
            <h3 style="color: #1f2937; margin-bottom: 15px; font-size: 1.3rem;">
              Localisation du CHU Fattouma-Bourguiba
            </h3>
            <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">
              <strong>📍 Coordonnées GPS :</strong><br>
              35.7770° N, 10.8268° E<br><br>
              <strong>🏥 Adresse :</strong><br>
              Avenue Farhat-Hached et rue du 1er-Juin 1995<br>
              5000 Monastir, Tunisie
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <button onclick="window.open('https://maps.google.com/?q=35.7770,10.8268')" 
                      style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        border: none;
                        padding: 14px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        transition: all 0.3s;
                      ">
                📍 Ouvrir dans Google Maps
              </button>
              <button onclick="window.open('https://waze.com/ul?ll=35.7770,10.8268&navigate=yes')" 
                      style="
                        background: linear-gradient(135deg, #10b981, #0da271);
                        color: white;
                        border: none;
                        padding: 14px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        transition: all 0.3s;
                      ">
                🚗 Itinéraire avec Waze
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Méthode pour réinitialiser les animations
  resetAnimations() {
    // Réinitialiser les statistiques
    document.querySelectorAll('.stat-number').forEach(el => {
      el.classList.remove('animated', 'animating');
      if (el instanceof HTMLElement) {
        el.textContent = '0';
      }
    });

    // Réinitialiser les sections révélées
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      el.classList.remove('revealed');
    });

    // Réinitialiser et relancer les animations
    setTimeout(() => {
      this.initScrollReveal();
      this.initStatsAnimation();
    }, 100);
  }
}