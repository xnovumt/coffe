import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  readonly formSubmitted = signal(false);
  name = '';
  email = '';
  message = '';

  onSubmit(): void {
    if (this.name && this.email && this.message) {
      this.formSubmitted.set(true);
      // Reset form fields
      this.name = '';
      this.email = '';
      this.message = '';
      
      // Auto dismiss success toast after 5s
      setTimeout(() => {
        this.formSubmitted.set(false);
      }, 5000);
    }
  }
}
