export class CursoDto {
    idCurso?: number | undefined;
    idCategoria!: number;
    nombre!: string;
    dias: boolean[] = [false, false, false, false, false, false, false];
    fechaInicio!: Date;
    fechaFin!: Date;
}