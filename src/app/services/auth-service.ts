import { inject, Injectable } from '@angular/core';
import {
  Auth,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { catchError, Observable, throwError, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  currentUser$: Observable<any> = user(this.auth);

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err) => {
        return throwError(() => this.handleError(err));
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err) => throwError(() => this.handleError(err)))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((err) => {
        return throwError(() => this.handleError(err));
      })
    );
  }

  private handleError(err: any): string {
    const code = err.code;

    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      case 'auth/user-not-found':
        return 'No user with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'Authentication error occurred.';
    }
  }
}
