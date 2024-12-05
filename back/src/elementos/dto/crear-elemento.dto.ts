import { IsNotEmpty, IsInt, IsString, IsOptional } from "class-validator"

export class CrearElementoDto {
    @IsOptional()
    @IsInt()
    idElemento: number;

    @IsInt()
    @IsNotEmpty()
    idTipoElemento: number // * Hace referencia a la ID de un 'tipo_elemento'.

    @IsString()
    @IsNotEmpty()
    descripcion: string

    @IsInt()
    @IsNotEmpty()
    cantidad: number
}