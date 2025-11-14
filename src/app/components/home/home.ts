import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  email = '';
  emailMessage = signal('');
  subscribed: boolean = false;
  isInstagramButtonEnabled = signal(false);
  instagramUrl = signal('https://www.instagram.com/aruri_shop/');

  changeButton() {
    this.isInstagramButtonEnabled.update((value) => !value);
  }

  likes = [signal(0), signal(0), signal(0)];
  onLike(index: number) {
    this.likes[index].update((value) => value + 1);
  }

  subscribe() {
    this.subscribed = true;
    const newMessage = `Thanks, ${this.email}, we’ll be in touch!`;
    this.emailMessage.set(newMessage);
  }
}
