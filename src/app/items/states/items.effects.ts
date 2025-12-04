import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { JewelryService } from '../../services/jewelry-service';
import {
  loadItem,
  loadItems,
  loadItemSuccess,
  loadItemsFailure,
  loadItemFailure,
  loadItemsSuccess,
} from './items.actions';
import { catchError, map, switchMap, of, timeout } from 'rxjs';

@Injectable()
export class ItemsEffects {
  private actions$ = inject(Actions);
  private itemsService = inject(JewelryService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      switchMap(({ query }) =>
        this.itemsService.getJewelry(query).pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError(() =>
            of(
              loadItemsFailure({
                error: 'Failed to load items',
              })
            )
          )
        )
      )
    )
  );

  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItem),
      switchMap(({ id }) =>
        this.itemsService.getJewelryById(id).pipe(
          timeout(2000),
          map((item) => loadItemSuccess({ item })),
          catchError(() =>
            of(
              loadItemFailure({
                error: 'Failed to load item details',
              })
            )
          )
        )
      )
    )
  );
}
