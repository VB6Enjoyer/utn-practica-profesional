import { Body, Controller, Get, Delete, Post, Put, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EjerciciosService } from '../services/ejercicios.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Ejercicio } from '../entities/ejercicio.entity';
import { CrearEjercicioDto } from '../dto/crear-ejercicio.dto';
import { ModificarEjercicioDto } from '../dto/modificar-ejercicio.dto';

@Controller('/ejercicios')
export class EjerciciosController {
    constructor(private ejerciciosService: EjerciciosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async obtenerEjercicios(): Promise<Ejercicio[]> {
        return await this.ejerciciosService.obtenerEjercicios();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorId')
    async obtenerEjercicioPorId(@Query('id') idEjercicio: number): Promise<Ejercicio> {
        return await this.ejerciciosService.obtenerEjercicioPorId(idEjercicio);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorNombre')
    async obtenerEjercicioPorNombre(@Query('nombre') nombre: string): Promise<Ejercicio> {
        return await this.ejerciciosService.obtenerEjercicioPorNombre(nombre);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearEjercicio(@Body() crearEjercicioDto: CrearEjercicioDto): Promise<Ejercicio> {
        return await this.ejerciciosService.crearEjercicio(crearEjercicioDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarEjercicio/:id')
    async modificarEjercicio(@Param('id') id: string, @Body() modificarEjercicioDto: ModificarEjercicioDto): Promise<Ejercicio> {
        const idNumber = parseInt(id, 10);
        return await this.ejerciciosService.modificarEjercicio(idNumber, modificarEjercicioDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarEjercicio/:id')
    async eliminarEjercicio(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.ejerciciosService.eliminarEjercicio(idParseada);
    }
}