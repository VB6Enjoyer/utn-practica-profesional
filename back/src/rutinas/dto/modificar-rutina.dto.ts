import { IsInt, IsOptional, IsString, Matches } from "class-validator"

export class ModificarRutinaDto {
    @IsOptional()
    @IsInt()
    idRutina: number;

    @IsOptional()
    @IsInt()
    idCategoria: number // * Hace referencia a la ID de una entrada en la tabla 'categoria'.

    @IsOptional()
    @IsString()
    nombre: string

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { // Solo acepta valores entre '00:00:00' y '23:59:59'.
        message: 'Time must be in the format HH:MM:SS',
    })
    horario: string // ! No existe un tipo 'time' en TS, abría que ver que queda mejor acá.
}