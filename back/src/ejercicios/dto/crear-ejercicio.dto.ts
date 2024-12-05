import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CrearEjercicioDto {
    @IsOptional()
    @IsInt()
    idEjercicio: number

    @IsNotEmpty()
    @IsString()
    ejercicio: string
}