import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Jewelry, JewelryService } from '../../services/jewelry-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectItemError,
  selectItemLoading,
  selectSelectedItem,
} from '../../items/states/items.selectors';
import { loadItem } from '../../items/states/items.actions';

@Component({
  selector: 'app-jewelry-details-component',
  standalone: true,
  imports: [RouterModule, CommonModule, CurrencyPipe],
  templateUrl: './jewelry-details-component.html',
  styleUrl: './jewelry-details-component.css',
})
export class JewelryDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  jewelry = signal<Jewelry | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  private store = inject(Store);

  item$ = this.store.select(selectSelectedItem);
  loading$ = this.store.select(selectItemLoading);
  error$ = this.store.select(selectItemError);

  // constructor() {
  //   this.route.paramMap
  //     .pipe(
  //       map((param) => param.get('id')),
  //       switchMap((paramId) => {
  //         if (!paramId) {
  //           this.error.set('Invalid id');
  //           this.loading.set(false);
  //           return of(null);
  //         }
  //         this.loading.set(true);
  //         this.error.set(null);
  //         return this.api.getJewelryById(paramId).pipe(
  //           catchError((error) => {
  //             this.error.set('Failed to fetch jewelry item');
  //             return of(null);
  //           }),
  //           finalize(() => {
  //             this.loading.set(false);
  //           })
  //         );
  //       })
  //     )
  //     .subscribe((j) => this.jewelry.set(j));
  // }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadItem({ id }));
    }
  }

  back() {
    this.router.navigateByUrl('/items');
  }
}
