import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  debounceTime,
  Subject,
  switchMap,
  startWith,
  distinctUntilChanged,
  catchError,
  finalize,
  of,
  tap,
} from 'rxjs';
import { Jewelry, JewelryService } from '../../services/jewelry-service';
import { ItemCard } from '../item-card/item-card';
import { loadItems } from '../../items/states/items.actions';
import {
  selectItems,
  selectItemsLoading,
  selectItemsError,
} from '../../items/states/items.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-jewelry-list',
  standalone: true,
  imports: [ItemCard, AsyncPipe, CommonModule],
  templateUrl: './jewelry-list.html',
  styleUrl: './jewelry-list.css',
})
export class JewelryList implements OnInit {
  jewelry = signal<Jewelry[]>([]);
  query = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  search$ = new Subject<string>();

  private store = inject(Store);

  items$ = this.store.select(selectItems);
  loading$ = this.store.select(selectItemsLoading);
  error$ = this.store.select(selectItemsError);

  constructor(private route: ActivatedRoute, private router: Router, private api: JewelryService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.query.set(q);
      this.search$.next(q);
    });

    // // before ngrx
    // this.search$
    //   .pipe(
    //     startWith(''),
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     tap((val) => {
    //       this.loading.set(true);
    //       this.error.set(null);
    //     }),
    //     switchMap((term) =>
    //       this.api.getJewelry(term).pipe(
    //         catchError(() => {
    //           this.error.set('Failed to load items');
    //           return of([] as Jewelry[]);
    //         }),
    //         finalize(() => {
    //           this.loading.set(false);
    //         })
    //       )
    //     )
    //   )
    //   .subscribe((data) => this.jewelry.set(data));

    this.search$.pipe(startWith(''), debounceTime(300), distinctUntilChanged()).subscribe((q) => {
      this.store.dispatch(loadItems({ query: q }));
    });
  }

  onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.query.set(val);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: val || null },
    });
  }

  refresh() {
    this.query.set('');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: null },
    });
    this.search$.next('');
  }
}
