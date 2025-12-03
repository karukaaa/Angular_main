import { createAction, props } from '@ngrx/store';
import { Jewelry } from '../../services/jewelry-service';

export const loadItems = createAction('[Items] Load Items', props<{ query: string }>());

export const loadItemsSuccess = createAction(
  'Items Load Items Success',
  props<{ items: Jewelry[] }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: string }>()
);

export const loadItem = createAction('[Items] Load Item', props<{ id: string | number }>());

export const loadItemSuccess = createAction(
  '[Items] Load Item Success',
  props<{ item: Jewelry }>()
);

export const loadItemFailure = createAction(
  '[Items] Load Item Failure',
  props<{ error: string }>()
);
