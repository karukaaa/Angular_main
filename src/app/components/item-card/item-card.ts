import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Jewelry } from '../../services/jewelry-service';
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  @Input() item!: Jewelry;
}
