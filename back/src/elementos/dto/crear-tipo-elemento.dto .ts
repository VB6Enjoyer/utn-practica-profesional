import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CrearTipoElementoDto {
    @IsOptional()
    @IsInt()
    idTipoElemento: number;

    @IsNotEmpty()
    @IsString()
    nombre: string
}