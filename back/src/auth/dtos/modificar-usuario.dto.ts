import { IsDate, IsInt, IsOptional, IsString } from "class-validator"
import { RolesEnum } from "../enums/roles.enum"

export class ModificarUsuarioDto {
    @IsOptional()
    @IsInt()
    idUsuario: number

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    nombre: string

    @IsOptional()
    @IsString()
    apellido: string

    @IsOptional()
    @IsString()
    documento: string // * Esto es una string en la DB.

    @IsOptional()
    @IsString()
    telefono: string // * También es una string en la DB.

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    direccion: string

    @IsOptional()
    @IsDate()
    fechaNacimiento: Date // * YYYY-MM-DD

    @IsOptional()
    rol: RolesEnum
}