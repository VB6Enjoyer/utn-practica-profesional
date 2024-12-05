import { Body, Controller, Get, Delete, Post, Put, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ElementosService } from '../services/elementos.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Elemento } from '../entities/elemento.entity';
import { CrearElementoDto } from '../dto/crear-elemento.dto';
import { ModificarElementoDto } from '../dto/modificar-elemento.dto';
import { TipoElemento } from '../entities/tipo-elemento.entity';
import { CrearTipoElementoDto } from '../dto/crear-tipo-elemento.dto ';
import { ModificarTipoElementoDto } from '../dto/modificar-tipo-elemento.dto';

@Controller('/elementos')
export class ElementosController {
    constructor(private elementosService: ElementosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('elemento')
    async obtenerElementos(): Promise<Elemento[]> {
        return await this.elementosService.obtenerElementos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('tipoElemento')
    async obtenerTipoElementos(): Promise<TipoElemento[]> {
        return await this.elementosService.obtenerTipoDeElementos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarElementoPorId')
    async obtenerElementoPorId(@Query('id') idElemento: number): Promise<Elemento> {
        return await this.elementosService.obtenerElementoPorId(idElemento);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarTipoDeElementoPorId')
    async obtenerTipoDeElementoPorId(@Query('id') idTipoElemento: number): Promise<TipoElemento> {
        return await this.elementosService.obtenerTipoDeElementoPorId(idTipoElemento);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarElementosPorTipoDeElemento')
    async obtenerElementosPorTipoDeElemento(@Query('id') idTipoElemento: number): Promise<Elemento[]> {
        return await this.elementosService.obtenerElementosPorTipoDeElemento(idTipoElemento);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarTipoDeElementosPorNombre')
    async obtenerTipoDeElementosPorNombre(@Query('nombre') nombre: string): Promise<TipoElemento[]> {
        return await this.elementosService.obtenerTipoDeElementosPorNombre(nombre);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('crearElemento')
    async crearElemento(@Body() crearElementoDto: CrearElementoDto): Promise<Elemento> {
        return await this.elementosService.crearElemento(crearElementoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('crearTipoDeElemento')
    async crearTipoDeElemento(@Body() crearTipoElementoDto: CrearTipoElementoDto): Promise<TipoElemento> {
        return await this.elementosService.crearTipoDeElemento(crearTipoElementoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarElemento/:id')
    async modificarElemento(@Param('id') id: string, @Body() modificarElementoDto: ModificarElementoDto): Promise<Elemento> {
        const idNumber = parseInt(id, 10);
        return await this.elementosService.modificarElemento(idNumber, modificarElementoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarTipoDeElemento/:id')
    async modificarTipoDeElemento(@Param('id') id: string, @Body() modificarTipoElementoDto: ModificarTipoElementoDto): Promise<TipoElemento> {
        const idNumber = parseInt(id, 10);
        return await this.elementosService.modificarTipoDeElemento(idNumber, modificarTipoElementoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarElemento/:id')
    async eliminarElemento(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.elementosService.eliminarElemento(idParseada);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarTipoDeElemento/:id')
    async eliminarTipoDeElemento(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.elementosService.eliminarTipoDeElemento(idParseada);
    }
}