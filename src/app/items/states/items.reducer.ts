import { Jewelry } from '../../services/jewelry-service';
import { createReducer, on } from '@ngrx/store';
import {
  loadItems,
  loadItem,
  loadItemFailure,
  loadItemSuccess,
  loadItemsFailure,
  loadItemsSuccess,
} from './items.actions';
import { NonNullableFormBuilder } from '@angular/forms';

export interface ItemsState {
  items: Jewelry[];
  selectedItem: Jewelry | null;

  listLoading: boolean;
  detailsLoading: boolean;

  listError: string | null;
  detailsError: string | null;
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  listLoading: false,
  detailsLoading: false,
  listError: null,
  detailsError: null,
};

export const itemsReducer = createReducer(
  initialState,

  on(loadItems, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),

  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    listLoading: false,
    listError: null,
  })),

  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error,
  })),

  on(loadItem, (state) => ({
    ...state,
    detailsLoading: true,
    detailsError: null,
    selectedItem: null,
  })),

  on(loadItemSuccess, (state, { item }) => ({
    ...state,
    selectedItem: item,
    detailsError: null,
    detailsLoading: false,
  })),

  on(loadItemFailure, (state, { error }) => ({
    ...state,
    detailsError: error,
    detailsLoading: false,
  }))
);
