import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css']
})
export class AProposComponent implements OnInit, AfterViewInit {

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

  ngOnInit() {
    this.createParticles();
  }

  ngAfterViewInit() {
    this.initScrollReveal();
    this.initStatsAnimation();
    this.initQuickNav();
  }

  createParticles() {
    // Particles will be created via CSS animations
  }

  filterServices(tab: string) {
    this.activeTab = tab;
    if (tab === 'all') {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(s => s.site === tab);
    }
  }

  initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  initStatsAnimation() {
    const animateValue = (element: HTMLElement, start: number, end: number, duration: number) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('fr-FR');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numberEls = entry.target.querySelectorAll('.stat-number[data-target]');
          numberEls.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            const targetValue = parseInt(htmlEl.dataset['target'] || '0');
            animateValue(htmlEl, 0, targetValue, 2000);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stats-container').forEach(section => {
      statsObserver.observe(section);
    });
  }

  initQuickNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.quick-nav a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      const quickNav = document.querySelector('.quick-nav');
      if (window.scrollY > 300) {
        quickNav?.classList.add('visible');
      } else {
        quickNav?.classList.remove('visible');
      }
    });
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}