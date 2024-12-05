import { IsInt, IsNumber, IsOptional, IsString } from "class-validator"
import { ModalidadesEnum } from "../enums/modalidades.enum"

export class ModificarCategoriaDto {
    @IsOptional()
    @IsInt()
    idCategoria: number

    @IsOptional()
    @IsString()
    tipo: string

    @IsOptional()
    @IsNumber()
    peso: number

    @IsOptional()
    modalidad: ModalidadesEnum
}