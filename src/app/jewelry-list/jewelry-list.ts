import { Component, OnInit } from '@angular/core';
import { Jewelry, JewelryService } from '../services/jewelry-service';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-jewelry-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './jewelry-list.html',
  styleUrl: './jewelry-list.css',
})

//this is branch live search
export class JewelryList implements OnInit {
  isLoaded = false;
  jewelryList: Jewelry[] = [];
  query = '';
  search$ = new Subject<string>();

  constructor(private jewelryService: JewelryService) {
    this.search$
      .pipe(
        debounceTime(300),
        switchMap((term) => jewelryService.getJewelry(term))
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.jewelryList = data;
        },
      });
  }

  ngOnInit(): void {
    this.loadJewelry();
  }

  loadJewelry(): void {
    this.query = '';
    this.jewelryService.getJewelry('').subscribe({
      next: (data) => {
        this.jewelryList = data;
      },
      error: (err) => console.log(err),
    });
    this.isLoaded = true;
  }

  onInput(e: Event) {
    const eventValue = (e.target as HTMLInputElement).value;
    this.query = eventValue;
    console.log(eventValue);
    this.search$.next(this.query);
  }
}
