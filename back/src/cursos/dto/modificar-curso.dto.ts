import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ModificarCursoDto {
    @IsOptional()
    @IsInt()
    idCurso: number

    @IsOptional()
    @IsInt()
    idCategoria: number // * Hace referencia a la id de la tabla "categoria".

    @IsOptional()
    @IsString()
    nombre: string

    // Array de 7 booleanos.
    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    @ArrayMinSize(7)
    @ArrayMaxSize(7)
    dias: boolean[] // Indexado en lunes.

    @IsOptional()
    @IsString()
    fechaInicio: string

    @IsOptional()
    @IsString()
    fechaFin: string
}