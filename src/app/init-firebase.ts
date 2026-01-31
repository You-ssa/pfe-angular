import { PaysService } from './services/pays.service';
import { inject } from '@angular/core';

export function initializeFirebase() {
  const paysService = inject(PaysService);
  return () => paysService.initializePays();
}