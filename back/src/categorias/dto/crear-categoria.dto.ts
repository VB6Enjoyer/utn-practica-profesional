import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { ModalidadesEnum } from "../enums/modalidades.enum"

export class CrearCategoriaDto {
    @IsOptional()
    @IsInt()
    idCategoria: number

    @IsNotEmpty()
    @IsString()
    tipo: string

    @IsNotEmpty()
    @IsNumber()
    peso: number

    @IsNotEmpty()
    modalidad: ModalidadesEnum
}