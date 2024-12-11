import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { HomeSateInterface } from '../types/homeState.interface';
import { fetchDoctorsSuccess, fetchServicesSuccess, fetchSpecializationsSuccess } from '../actions/home.actions';

export interface State {}

export const initialState: HomeSateInterface = {
  isLoading: false,
  specializations: [],
  service: [],
  doctors: [],
  error: null
};

export const reducers: ActionReducerMap<State> = {};

export const homeReducer = createReducer(
  initialState,
  on(fetchDoctorsSuccess, (state, { doctors }) => {
    return {
      ...state,
      doctors: doctors,
      isLoading: false
    }
  }),
  on(fetchServicesSuccess, (state, { services }) => {
    return {
      ...state,
      services: services,
      isLoading: false
    }
  }),
  on(fetchSpecializationsSuccess, (state, { specializations }) => {
    return {
      ...state,
      specializations: specializations,
      isLoading: false
    }
  }),

);

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
