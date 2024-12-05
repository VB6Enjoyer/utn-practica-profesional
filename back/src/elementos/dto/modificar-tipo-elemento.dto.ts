import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ModificarTipoElementoDto {
    @IsOptional()
    @IsInt()
    idTipoElemento: number;

    @IsNotEmpty()
    @IsString()
    nombre: string
}