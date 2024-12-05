import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Rutina } from "../entities/rutina.entity";
import { CrearRutinaDto } from "../dto/crear-rutina.dto";
import { ModificarRutinaDto } from "../dto/modificar-rutina.dto";
import { CategoriasService } from "src/categorias/services/categorias.service";
import { Categoria } from "src/categorias/entities/categoria.entity";

@Injectable()
export class RutinasService {
    constructor(
        @InjectRepository(Rutina) private rutinasRepo: Repository<Rutina>,
        private categoriasService: CategoriasService
    ) { }

    async obtenerRutinas(): Promise<Rutina[]> {
        const rutinas: Rutina[] = await this.rutinasRepo.find();

        if (rutinas.length == 0) {
            throw new NotFoundException(
                'No existen rutinas en la base de datos.',
            );
        }

        return rutinas;
    }

    async obtenerRutinaPorId(idRutina: number): Promise<Rutina> {
        const rutina = await this.rutinasRepo.findOne({
            where: {
                idRutina: idRutina
            },
        });

        if (!rutina) {
            throw new NotFoundException(
                'No existe una rutina con esta ID de rutina.',
            );
        }

        return rutina;
    }

    async obtenerRutinasPorCategoria(idCategoria: number): Promise<Rutina[]> {
        const rutinas: Rutina[] = await this.rutinasRepo.find({
            where: {
                idCategoria: idCategoria,
            }
        });

        if (rutinas.length == 0) {
            throw new NotFoundException(
                'No existen rutinas con la categoría especificacda en la base de datos.',
            );
        }

        return rutinas;
    }

    async obtenerRutinasPorNombre(nombre: string): Promise<Rutina[]> {
        const rutinas: Rutina[] = await this.rutinasRepo.find({
            where: {
                nombre: Like(`%${nombre}%`),
            }
        });

        if (!rutinas) {
            throw new NotFoundException(
                'No existen rutinas con nombres similares en la base de datos.',
            );
        }

        return rutinas;
    }

    // TODO Implementar en caso de ser necesario.
    async obtenerRutinasPorRangoHorario(horario: string): Promise<Rutina[]> {
        return;
    }

    async crearRutina(crearRutinaDto: CrearRutinaDto): Promise<Rutina> {
        const rutina = new Rutina();

        const categoria: Categoria = await this.categoriasService.obtenerCategoriaPorId(crearRutinaDto.idCategoria);

        if (!categoria) {
            throw new NotFoundException(
                'La categoría especificada no existe en la base de datos.'
            );
        }

        rutina.idCategoria = crearRutinaDto.idCategoria;
        rutina.nombre = crearRutinaDto.nombre;
        rutina.horario = crearRutinaDto.horario;

        await this.rutinasRepo.save(rutina);

        return rutina;
    }

    async modificarRutina(id: number, modificarRutinaDto: ModificarRutinaDto): Promise<Rutina> {
        const rutina: Rutina = await this.rutinasRepo.findOne({ where: { idRutina: id } });

        if (!rutina) {
            throw new NotFoundException('No se encontró una rutina con la ID especificada.');
        }

        if (modificarRutinaDto.idCategoria !== undefined) {
            const categoria: Categoria = await this.categoriasService.obtenerCategoriaPorId(modificarRutinaDto.idCategoria);

            if (categoria) {
                rutina.idCategoria = modificarRutinaDto.idCategoria;
            } else {
                throw new NotFoundException("La categoría especificada no existe en la base de datos.")
            }
        }

        if (modificarRutinaDto.nombre !== undefined) {
            rutina.nombre = modificarRutinaDto.nombre;
        }

        if (modificarRutinaDto.horario !== undefined) {
            rutina.horario = modificarRutinaDto.horario;
        }

        await this.rutinasRepo.save(rutina);

        return rutina;
    }

    async eliminarRutina(id: number): Promise<void> {
        const rutina = await this.obtenerRutinaPorId(id);

        if (!rutina) {
            throw new NotFoundException('No se encontró una rutina con la ID especificada.');
        }

        await this.rutinasRepo.remove(rutina);
    }
}