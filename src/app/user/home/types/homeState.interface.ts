import { IDoctor, ISection, IService, ISpecialization } from "../interfaces/home.interface";

export interface IHomeState {
    specializations: ISpecialization[];
    services: IService[];
    doctors: IDoctor[];
    sections: ISection[]
}