export interface IDoctor {
    id: number;
    name: string;
    title: string;
    img: string;
    specializationId: number;
    days: string;
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

export interface ISection {
    id: string;
    name: string;
    content?: string;
    img?: string;
    sectionId?: number;
}