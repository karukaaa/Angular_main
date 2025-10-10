import { Component, OnInit } from '@angular/core';
import { Jewelry, JewelryService } from '../services/jewelry-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jewelry-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './jewelry-list.html',
  styleUrl: './jewelry-list.css'
})
export class JewelryList implements OnInit{
    jewelryList: Jewelry[] = [];
    isLoaded = false;

    constructor(private jewelryService: JewelryService){}

    ngOnInit(): void {
      this.jewelryService.getJewelry().subscribe({
        next: (data) => {
            this.jewelryList = data;
            console.log(data)
        }
      })
    }

    loadJewelry(): void{
      this.isLoaded = true;
    }
}
