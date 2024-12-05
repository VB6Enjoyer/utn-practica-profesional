import { Body, Controller, Get, Delete, Post, Put, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Categoria } from '../entities/categoria.entity';
import { ModalidadesEnum } from '../enums/modalidades.enum';
import { CrearCategoriaDto } from '../dto/crear-categoria.dto';
import { ModificarCategoriaDto } from '../dto/modificar-categoria.dto';

@Controller('/categorias')
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async obtenerCategorias(): Promise<Categoria[]> {
        return await this.categoriasService.obtenerCategorias();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorId')
    async obtenerCategoriaPorId(@Query('id') idCategoria: number): Promise<Categoria> {
        return await this.categoriasService.obtenerCategoriaPorId(idCategoria);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorTipo')
    async obtenerCategoriaPorTipo(@Query('tipo') tipo: string, @Query('modalidad') modalidad: ModalidadesEnum): Promise<Categoria> {
        return await this.categoriasService.obtenerCategoriaPorTipo(tipo, modalidad);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorPeso')
    async obtenerCategoriaPorPeso(@Query('peso') peso: number): Promise<Categoria> {
        return await this.categoriasService.obtenerCategoriaPorPeso(peso);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorModalidad')
    async obtenerCategoriasPorModalidad(@Query('modalidad') modalidad: ModalidadesEnum): Promise<Categoria[]> {
        return await this.categoriasService.obtenerCategoriasPorModalidad(modalidad);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearCategoria(@Body() crearCategoriaDto: CrearCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.crearCategoria(crearCategoriaDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarCategoria/:id')
    async modificarCategoria(@Param('id') id: string, @Body() modificarCategoriaDto: ModificarCategoriaDto): Promise<Categoria> {
        const idNumber = parseInt(id, 10);
        return await this.categoriasService.modificarCategoria(idNumber, modificarCategoriaDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarCategoria/:id')
    async eliminarCategoria(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.categoriasService.eliminarCategoria(idParseada);
    }
}