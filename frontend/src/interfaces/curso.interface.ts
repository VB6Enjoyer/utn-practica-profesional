import { Rutina } from "./rutina.interface";

export interface Curso {
    idCurso: number;
    idCategoria: number;
    nombre: string;
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
    fechaInicio: string;
    fechaFin: string;
    rutinas: Rutina[];
}