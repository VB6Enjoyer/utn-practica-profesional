import { IsInt, IsOptional, IsString } from "class-validator"

export class ModificarElementoDto {
    @IsOptional()
    @IsInt()
    idElemento: number;

    @IsInt()
    @IsOptional()
    idTipoElemento: number // * Hace referencia a la ID de un 'tipo_elemento'.

    @IsString()
    @IsOptional()
    descripcion: string

    @IsInt()
    @IsOptional()
    cantidad: number
}