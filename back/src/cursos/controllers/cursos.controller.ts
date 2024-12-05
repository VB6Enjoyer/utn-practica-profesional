import { Body, Controller, Get, Delete, Post, Put, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CursosService } from '../services/cursos.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Curso } from '../entities/curso.entity';
import { CrearCursoDto } from '../dto/crear-curso.dto';
import { ModificarCursoDto } from '../dto/modificar-curso.dto';

@Controller('/cursos')
export class CursosController {
    constructor(private cursosService: CursosService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async obtenerCursos(): Promise<Curso[]> {
        return await this.cursosService.obtenerCursos();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorId')
    async obtenerCursoPorId(@Query('id') idCurso: number): Promise<Curso> {
        return await this.cursosService.obtenerCursoPorId(idCurso);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorCategoria')
    async obtenerCursosPorCategoria(@Query('categoriaId') categoriaId: number): Promise<Curso[]> {
        return await this.cursosService.obtenerCursosPorCategoria(categoriaId);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('buscarPorNombre')
    async obtenerCursosPorNombre(@Query('nombre') nombre: string): Promise<Curso[]> {
        return await this.cursosService.obtenerCursosPorNombre(nombre);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async crearCurso(@Body() crearCursoDto: CrearCursoDto): Promise<Curso> {
        return await this.cursosService.crearCurso(crearCursoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('modificarCurso/:id')
    async modificarCurso(@Param('id') id: string, @Body() modificarCursoDto: ModificarCursoDto): Promise<Curso> {
        const idNumber = parseInt(id, 10);
        return await this.cursosService.modificarCurso(idNumber, modificarCursoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('eliminarCurso/:id')
    async eliminarCurso(@Param('id') id: string): Promise<void> {
        const idParseada = parseInt(id, 10);
        await this.cursosService.eliminarCurso(idParseada);
    }
}