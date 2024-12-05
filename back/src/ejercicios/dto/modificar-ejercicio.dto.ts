import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ModificarEjercicioDto {
    @IsOptional()
    @IsInt()
    idEjercicio: number

    @IsNotEmpty()
    @IsString()
    ejercicio: string
}