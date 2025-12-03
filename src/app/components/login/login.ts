import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal<string>('');
  password = signal<string>('');
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  submitForm() {
    console.log(this.email());
    console.log(this.password());

    this.error.set(null);
    this.loading.set(true);

    const emailValue = this.email();
    const passwordValue = this.password();

    this.auth.login(emailValue, passwordValue).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/profile']);
      },
      error: (errMsg: string) => {
        this.password.set('');
        this.loading.set(false);
        this.error.set(errMsg);
      },
    });
  }
}
