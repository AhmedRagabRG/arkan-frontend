import { createAction, props } from "@ngrx/store";
import { IDoctor, ISection, IService, ISpecialization } from "../interfaces/home.interface";
import { HttpErrorResponse } from "@angular/common/http";

// Start
export const fetchDoctorsStart = createAction('[Home Page] Home Fetch Doctors Data Start');
export const fetchServicesStart = createAction('[Home Page] Home Fetch Services Data Start');
export const fetchSpecializationsStart = createAction('[Home Page] Home Fetch Specializations Data Start');
export const fetchSectionsStart = createAction('[Home Page] Home Fetch Sections Data Start');

// Success
export const fetchDoctorsSuccess = createAction(
    '[Home Page] Home Fetch Doctors Data Success',
    props<{
        doctors: IDoctor[],
    }>()
);
export const fetchServicesSuccess = createAction(
    '[Home Page] Home Fetch Services Data Success',
    props<{
        services: IService[],
    }>()
);
export const fetchSpecializationsSuccess = createAction(
    '[Home Page] Home Fetch Specializations Data Success',
    props<{
        specializations: ISpecialization[],
    }>()
);
export const fetchSectionsSuccess = createAction(
    '[Home Page] Home Fetch Sections Data Success',
    props<{
        sections: ISection[],
    }>()
);

// Failled
export const fetchDoctorsError = createAction('[Home Page] Home Fetch Doctors Data Error', props<{ error: HttpErrorResponse }>());
export const fetchServicesError = createAction('[Home Page] Home Fetch Services Data Error', props<{ error: HttpErrorResponse }>());
export const fetchSpecializationsError = createAction('[Home Page] Home Fetch Specializations Data Error', props<{ error: HttpErrorResponse }>());
export const fetchSectionsError = createAction('[Home Page] Home Fetch Sections Data Error', props<{ error: HttpErrorResponse }>());

