import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { JewelryService } from '../../services/jewelry-service';
import * as ItemsActions from './items.actions';
import { catchError, map, switchMap, of } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private itemsService: JewelryService) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      switchMap(({ query }) =>
        this.itemsService.getJewelry(query ?? '').pipe(
          map((items) => ItemsActions.loadItemsSuccess({ items })),
          catchError(() =>
            of(
              ItemsActions.loadItemsFailure({
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
      ofType(ItemsActions.loadItem),
      switchMap(({ id }) =>
        this.itemsService.getJewelryById(id).pipe(
          map((item) => ItemsActions.loadItemSuccess({ item })),
          catchError(() =>
            of(
              ItemsActions.loadItemFailure({
                error: 'Failed to load item details',
              })
            )
          )
        )
      )
    )
  );
}
