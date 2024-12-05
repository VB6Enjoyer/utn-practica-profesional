import { Body, Controller, Get, Delete, Post, Put, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RutinasService } from '../services/rutinas.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Rutina } from '../entities/rutina.entity';
import { CrearRutinaDto } from '../dto/crear-rutina.dto';
import { ModificarRutinaDto } from '../dto/modificar-rutina.dto';

@Controller('/rutinas')
export class RutinasController {
    constructor(private rutinasService: RutinasService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async obtenerRutinas(): Promise<Rutina[]> {
        return await this.rutinasService.obtenerRutinas();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorId')
    async obtenerRutinaPorId(@Query('id') idRutina: number): Promise<Rutina> {
        return await this.rutinasService.obtenerRutinaPorId(idRutina);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorCategoria')
    async obtenerRutinasPorCategoria(@Query('id') idCategoria: number): Promise<Rutina[]> {
        return await this.rutinasService.obtenerRutinasPorCategoria(idCategoria);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorNombre')
    async obtenerRutinasPorNombre(@Query('nombre') nombre: string): Promise<Rutina[]> {
        return await this.rutinasService.obtenerRutinasPorNombre(nombre);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearRutina(@Body() crearRutinaDto: CrearRutinaDto): Promise<Rutina> {
        return await this.rutinasService.crearRutina(crearRutinaDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarRutina/:id')
    async modificarRutina(@Param('id') id: string, @Body() modificarRutinaDto: ModificarRutinaDto): Promise<Rutina> {
        const idNumber = parseInt(id, 10);
        return await this.rutinasService.modificarRutina(idNumber, modificarRutinaDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarRutina/:id')
    async eliminarRutina(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.rutinasService.eliminarRutina(idParseada);
    }
}