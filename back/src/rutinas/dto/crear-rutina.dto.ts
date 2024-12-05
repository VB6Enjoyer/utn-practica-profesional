import { IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"

export class CrearRutinaDto {
    @IsOptional()
    @IsInt()
    idRutina: number

    @IsNotEmpty()
    @IsInt()
    idCategoria: number // * Hace referencia a la ID de una entrada en la tabla 'categoria'.

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { // Solo acepta valores entre '00:00:00' y '23:59:59'.
        message: 'Time must be in the format HH:MM:SS',
    })
    horario: string // ! No existe un tipo 'time' en TS, abría que ver que queda mejor acá.
}