import { HttpErrorResponse } from "@angular/common/http"
import { createReducer, on } from "@ngrx/store"
import { fetchHomeDataError, fetchHomeDataStart, fetchHomeDataSuccess } from "../actions/home.actions"

export interface State {
    isLoading: boolean | undefined
    error: HttpErrorResponse | undefined
}

const initialState : State = {
    isLoading: undefined,
    error: undefined
}

export const reducer = createReducer(
    initialState,
    on(fetchHomeDataStart, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(fetchHomeDataError, (state, {error}) => {
        return {
            ...state,
            isLoading: false,
            error
        }
    }),
    on(fetchHomeDataSuccess, (state) => {
        return {
            ...state,
            isLoading: false,
            error: undefined
        }
    })
)

export const isLoading = (state: State) => state.isLoading;
export const error = (state: State) => state.error;