import { Ejercicio } from "./ejercicio.interface";

export interface Rutina {
    idCategoria: number;
    nombre: string;
    horario: string;
    ejercicios: Ejercicio[];
}