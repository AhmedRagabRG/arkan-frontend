import { IDoctor, IService, ISpecialization } from "../interfaces/home.interface";

export interface HomeSateInterface {
    isLoading: boolean
    specializations: ISpecialization[];
    service: IService[];
    doctors: IDoctor[];
    error: any
}