import * as fromHome from './home.reducer'
import * as fromApi from './api.reducer'
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter } from './home.reducer';

export interface HomeState {
  home: fromHome.State,
  api: fromApi.State
}

export function reducers(state: HomeState, action: Action): any {
  return combineReducers({
    home: fromHome.reducer,
    api: fromApi.reducer,
  })(state, action)
}

const featureSelector = createFeatureSelector<HomeState>("home");

const homeSelector = createSelector(featureSelector, x=>x.home);
const apiSelector = createSelector(featureSelector, x=>x.api);

const {selectAll} = adapter.getSelectors(homeSelector);

export const homeEntites = selectAll;

export const getIsApiLoading = createSelector(
  apiSelector,
  fromApi.isLoading
)

export const getIsApiError = createSelector(
  apiSelector,
  fromApi.error
)