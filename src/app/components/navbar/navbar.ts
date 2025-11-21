import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(AuthService);

  user = signal<any | null>(null);

  constructor() {
    this.auth.currentUser$.subscribe((u) => {
      this.user.set(u);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.user.set(null);
    });
  }
}
