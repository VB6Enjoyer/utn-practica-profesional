import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CrearCursoDto {
    @IsOptional()
    @IsInt()
    idCurso: number

    @IsNotEmpty()
    @IsInt()
    idCategoria: number // * Hace referencia a la id de la tabla "categoria".

    @IsNotEmpty()
    @IsString()
    nombre: string

    // Array de 7 booleanos.
    @IsNotEmpty()
    @IsArray()
    @IsBoolean({ each: true })
    @ArrayMinSize(7)
    @ArrayMaxSize(7)
    dias: boolean[] // Indexado en lunes.

    @IsNotEmpty()
    @IsString()
    fechaInicio: string

    @IsOptional() // * Asumo que es posible tener cursos constantes sin fecha de fin.
    @IsString()
    fechaFin: string
}