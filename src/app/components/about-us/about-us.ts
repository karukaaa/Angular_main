import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  imports: [FormsModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  protected readonly title = signal('main-project');
  name = signal('Aruri Jewelry');
  place = signal('Almaty');
  isButtonEnabled = signal(false);

  logo = signal('logo.jpg');
}
