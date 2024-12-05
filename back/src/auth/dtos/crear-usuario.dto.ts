import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { RolesEnum } from "../enums/roles.enum"

export class CrearUsuarioDto {
    @IsOptional()
    @IsInt()
    idUsuario: number

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    apellido: string

    @IsNotEmpty()
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

    @IsNotEmpty()
    @IsDate()
    fechaNacimiento: Date // * YYYY-MM-DD

    @IsNotEmpty()
    rol: RolesEnum
}