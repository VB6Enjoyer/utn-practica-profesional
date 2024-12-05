import { Curso } from "./curso.interface";

export interface Usuario {
  idUsuario: number;
  username: string;
  nombre: string;
  apellido: string;
  documento: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaNacimiento: string;
  rol: string;
  cursos: Curso[]; 
}
