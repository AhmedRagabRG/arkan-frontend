export interface IDoctor {
    id: number;
    name: string;
    title: string;
    img: string;
    specializationId: number;
}

export interface IService {
    id?: number;
    title: string;
    content?: string;
    img: string;
}

export interface ISpecialization {
    id?: number;
    name: string;
}