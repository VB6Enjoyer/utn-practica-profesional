import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Curso } from "../entities/curso.entity";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { CategoriasService } from "src/categorias/services/categorias.service";
import { CrearCursoDto } from "../dto/crear-curso.dto";
import { ModificarCursoDto } from "../dto/modificar-curso.dto";

@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(Curso) private cursosRepo: Repository<Curso>,
        private categoriasService: CategoriasService
    ) { }

    async obtenerCursos(): Promise<Curso[]> {
        const cursos: Curso[] = await this.cursosRepo.find();

        if (cursos.length == 0) {
            throw new NotFoundException(
                'No existen cursos en la base de datos.',
            );
        }

        return cursos;
    }

    async obtenerCursoPorId(idCurso: number): Promise<Curso> {
        const curso = await this.cursosRepo.findOne({
            where: {
                idCurso: idCurso
            },
        });

        if (!curso) {
            throw new NotFoundException(
                'No existe un curso con esta ID de curso.',
            );
        }

        return curso;
    }

    async obtenerCursosPorCategoria(idCategoria: number): Promise<Curso[]> {
        const cursos: Curso[] = await this.cursosRepo.find({
            where: {
                idCategoria: idCategoria,
            }
        });

        const categoria: Categoria = await this.categoriasService.obtenerCategoriaPorId(idCategoria);

        if (!categoria) {
            throw new NotFoundException(
                'La categoría especificada no existe en la base de datos.'
            );
        }

        if (!cursos) {
            throw new NotFoundException(
                'No existen cursos correspondientes a la categoría ' + categoria.tipo + ' (' + categoria.modalidad + ') en la base de datos.',
            );
        }

        return cursos;
    }

    async obtenerCursosPorNombre(nombre: string): Promise<Curso[]> {
        const cursos: Curso[] = await this.cursosRepo.find({
            where: {
                nombre: Like(`%${nombre}%`),
            }
        });

        if (!cursos) {
            throw new NotFoundException(
                'No existen cursos con nombres similares.',
            );
        }

        return cursos;
    }

    // TODO Implementar en caso de ser necesario.
    async obtenerCursosPorDia(dia: Boolean): Promise<Curso[]> {
        return;
    }

    // TODO Implementar en caso de ser necesario.
    async obtenerCursosPorFecha(fechaInicio: Date, fechaFin: Date): Promise<Curso[]> {
        return;
    }

    async crearCurso(crearCursoDto: CrearCursoDto): Promise<Curso> {
        const curso = new Curso();

        const categoria: Categoria = await this.categoriasService.obtenerCategoriaPorId(crearCursoDto.idCategoria);

        if (!categoria) {
            throw new NotFoundException(
                'La categoría especificada no existe en la base de datos.'
            );
        }

        if (crearCursoDto.fechaFin && (new Date(crearCursoDto.fechaInicio) > new Date(crearCursoDto.fechaFin))) {
            throw new BadRequestException(
                'La fecha de inicio no puede ser más reciente que la fecha de fin del curso.'
            );
        }

        curso.idCategoria = crearCursoDto.idCategoria;
        curso.nombre = crearCursoDto.nombre;
        curso.lunes = crearCursoDto.dias[0];
        curso.martes = crearCursoDto.dias[1];
        curso.miercoles = crearCursoDto.dias[2];
        curso.jueves = crearCursoDto.dias[3];
        curso.viernes = crearCursoDto.dias[4];
        curso.sabado = crearCursoDto.dias[5];
        curso.domingo = crearCursoDto.dias[6];
        curso.fechaInicio = this.addHoursToDate(new Date(crearCursoDto.fechaInicio), 4);
        curso.fechaFin = this.addHoursToDate(new Date(crearCursoDto.fechaFin), 4);

        await this.cursosRepo.save(curso);

        return curso;
    }

    async modificarCurso(id: number, modificarCursoDto: ModificarCursoDto): Promise<Curso> {
        const curso: Curso = await this.cursosRepo.findOne({ where: { idCurso: id } });

        if (!curso) {
            throw new Error('No se encontró un curso con la ID especificada.');
        }

        const categoria: Categoria = await this.categoriasService.obtenerCategoriaPorId(modificarCursoDto.idCategoria);

        if (!categoria) {
            throw new NotFoundException(
                'La categoría especificada no existe en la base de datos.'
            );
        }

        if (modificarCursoDto.fechaInicio || modificarCursoDto.fechaFin) {
            const fechaInicio = modificarCursoDto.fechaInicio ? new Date(modificarCursoDto.fechaInicio) : new Date(curso.fechaInicio);
            const fechaFin = modificarCursoDto.fechaFin ? new Date(modificarCursoDto.fechaFin) : new Date(curso.fechaFin);

            if (fechaInicio > fechaFin) {
                throw new BadRequestException(
                    'La fecha de inicio no puede ser más reciente que la fecha de fin del curso.'
                );
            }
        }

        if (modificarCursoDto.idCategoria !== undefined && modificarCursoDto.fechaInicio.length > 0) {
            curso.idCategoria = modificarCursoDto.idCategoria;
        }

        if (modificarCursoDto.nombre !== undefined && modificarCursoDto.fechaInicio.length > 0) {
            curso.nombre = modificarCursoDto.nombre;
        }

        if (modificarCursoDto.dias !== undefined) {
            curso.lunes = modificarCursoDto.dias[0];
            curso.martes = modificarCursoDto.dias[1];
            curso.miercoles = modificarCursoDto.dias[2];
            curso.jueves = modificarCursoDto.dias[3];
            curso.viernes = modificarCursoDto.dias[4];
            curso.sabado = modificarCursoDto.dias[5];
            curso.domingo = modificarCursoDto.dias[6];
        }

        if (modificarCursoDto.fechaInicio !== undefined && modificarCursoDto.fechaInicio.length > 0) {
            curso.fechaInicio = this.addHoursToDate(new Date(modificarCursoDto.fechaInicio), 4);
        }

        if (modificarCursoDto.fechaFin !== undefined && modificarCursoDto.fechaInicio.length > 0) {
            curso.fechaFin = this.addHoursToDate(new Date(modificarCursoDto.fechaFin), 4);
        }

        await this.cursosRepo.save(curso);

        return curso;
    }

    async eliminarCurso(id: number): Promise<void> {
        const curso = await this.obtenerCursoPorId(id);

        if (!curso) {
            throw new NotFoundException('No se encontró un curso con la ID especificada.');
        }

        await this.cursosRepo.remove(curso);
    }

    addHoursToDate(date: Date, hours: number): Date {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    }
}