import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  private verificationCodes = new Map<string, { code: string; expiry: number }>();

  constructor() {}

  /**
   * Génère et "envoie" un code de vérification à 4 chiffres
   * @param email Email de l'utilisateur
   * @returns Le code généré (normalement, ce serait envoyé par email)
   */
  async sendVerificationCode(email: string): Promise<string> {
    // Génère un code aléatoire à 4 chiffres
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Stocke le code avec une expiration de 10 minutes
    const expiry = Date.now() + 10 * 60 * 1000;
    this.verificationCodes.set(email.toLowerCase(), { code, expiry });

    // Simulation d'envoi d'email
    console.log(`📧 CODE DE VÉRIFICATION pour ${email}: ${code}`);
    console.log(`⏰ Expire dans 10 minutes`);

    // Simulation de délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    // En production, vous utiliseriez un service d'email réel
    // Par exemple: await this.emailService.send(email, code);

    return code; // Retourné uniquement pour la simulation
  }

  /**
   * Vérifie si le code saisi est correct
   * @param email Email de l'utilisateur
   * @param code Code saisi par l'utilisateur
   * @returns true si le code est valide, false sinon
   */
  verifyCode(email: string, code: string): boolean {
    const stored = this.verificationCodes.get(email.toLowerCase());

    if (!stored) {
      console.log('❌ Aucun code trouvé pour cet email');
      return false;
    }

    // Vérifie si le code a expiré
    if (Date.now() > stored.expiry) {
      console.log('❌ Code expiré');
      this.verificationCodes.delete(email.toLowerCase());
      return false;
    }

    // Vérifie si le code correspond
    if (stored.code === code.trim()) {
      console.log('✅ Code vérifié avec succès');
      this.verificationCodes.delete(email.toLowerCase());
      return true;
    }

    console.log('❌ Code incorrect');
    return false;
  }

  /**
   * Supprime le code de vérification pour un email
   * @param email Email de l'utilisateur
   */
  clearCode(email: string): void {
    this.verificationCodes.delete(email.toLowerCase());
  }
}