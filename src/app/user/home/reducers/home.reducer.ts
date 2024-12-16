import { isDevMode } from '@angular/core';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import { IHomeState } from '../types/homeState.interface';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { fetchHomeDataSuccess } from '../actions/home.actions';

export interface State extends EntityState<IHomeState> { }

export const adapter: EntityAdapter<IHomeState> = createEntityAdapter<IHomeState>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  specializations: [],
  sections: [],
  service: [],
  doctors: [],
})

export const reducer = createReducer(
  initialState,
  on(fetchHomeDataSuccess, (state, { doctors, services, specializations, sections }) => {
    return adapter.setAll([{ doctors, services, specializations, sections }], state)
  }),
);

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
