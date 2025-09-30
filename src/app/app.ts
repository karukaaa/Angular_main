import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('main-project');

  name = signal("Aruri Jewelry");
  place = signal("Almaty");
  isButtonEnabled = signal(false);

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
}
