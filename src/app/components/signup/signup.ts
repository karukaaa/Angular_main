
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email = '';
  password = '';
  confirmPassword = '';

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  submitForm() {
    this.error.set(null);

    if (this.password !== this.confirmPassword) {
      this.error.set("Passwords don't match.");
      return;
    }

    this.loading.set(true);

    this.auth.signUp(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/profile']);
      },
      error: (errMsg: string) => {
        this.loading.set(false);
        this.error.set(errMsg);
      },
    });
  }
}
