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

  constructor(private jewelryService: JewelryService) {}

  ngOnInit(): void {
    this.jewelryService.getJewelry().subscribe({
      next: (data) => {
        this.jewelryList = data;
      },
      error: (err) => console.log(err),
    });

    this.searchTerms
      .pipe(
        debounceTime(200),
        switchMap((term) => this.jewelryService.searchJewelry(term))
      )
      .subscribe({
        next: (results) => {
          this.jewelryList = results;
        },
        error: (err) => console.log(err),
      });
  }

  loadJewelry(): void {
    this.isLoaded = true;
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }
}
