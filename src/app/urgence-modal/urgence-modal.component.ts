import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ضروري لـ *ngIf

@Component({
  selector: 'app-urgence-modal',
  standalone: true, // مهم
  imports: [CommonModule], // ضروري لـ *ngIf
  templateUrl: './urgence-modal.component.html',
  styleUrls: ['./urgence-modal.component.css']
})
export class UrgenceModalComponent {
  isOpen = false;

  // تفعيل وإغلاق المودال
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  // الاتصال مباشرة من الزر
  callNumber(number: string) {
    window.location.href = `tel:${number}`;
  }
}
