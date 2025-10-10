import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JewelryList } from "./jewelry-list/jewelry-list";

@Component({
  selector: 'app-root',
  imports: [FormsModule, JewelryList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('main-project');

  name = signal("Aruri Jewelry");
  place = signal("Almaty");
  isButtonEnabled = signal(false);

  email = '';
  emailMessage = signal('')
  subscribed: boolean = false;

  logo = signal("logo.jpg");
  instagramUrl = signal("https://www.instagram.com/aruri_shop/");

  isInstagramButtonEnabled = signal(false);
  changeButton(){
    this.isInstagramButtonEnabled.update(value=>!value);
  }

  likes = [signal(0), signal(0), signal(0)];
  onLike(index:number){
    this.likes[index].update(value=>value+1);
  }

  subscribe(){
    this.subscribed = true;
    const newMessage = `Thanks, ${this.email}, we’ll be in touch!`;
    this.emailMessage.set(newMessage);
  }
}
