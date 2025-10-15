import { Component, OnInit } from '@angular/core';
import { Jewelry, JewelryService } from '../services/jewelry-service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';

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
  private searchTerms = new Subject<string>();
  jewelryList: Jewelry[] = [];
  allJewelry: Jewelry[] = [];

  constructor(private jewelryService: JewelryService) {}

  ngOnInit(): void {
    this.jewelryService.getJewelry().subscribe({
      next: (data) => {
        this.allJewelry = data;
        this.jewelryList = data;
      },
      error: (err) => console.log(err),
    });

    this.searchTerms
      .pipe(
        debounceTime(200),
        switchMap((term) => {
          const trimmed = term.trim().toLowerCase();

          if (trimmed === '') {
            return of(this.allJewelry);
          }

          return of(
            this.allJewelry.filter((item) =>
              (item.description + item.name).toLowerCase().includes(trimmed)
            )
          );
        })
      )
      .subscribe((result) => {
        this.jewelryList = result;
      });
  }

  loadJewelry(): void {
    this.jewelryList = this.allJewelry;
    this.isLoaded = true;
  }

  onSearch(query: string): void {
    this.searchTerms.next(query);
  }
}
