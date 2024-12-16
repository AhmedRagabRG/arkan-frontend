import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { IHomeState } from "../types/homeState.interface";

// Start
export const fetchHomeDataStart = createAction('[Home Page] Home Fetch Home Data Start');

// Success
export const fetchHomeDataSuccess = createAction(
    '[Home Page] Home Fetch Home Data Success',
    props<IHomeState>()
);

// Failled
export const fetchHomeDataError = createAction('[Home Page] Home Fetch Home Data Error', props<{ error: HttpErrorResponse }>());

