import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ejercicio } from "../entities/ejercicio.entity";
import { CrearEjercicioDto } from "../dto/crear-ejercicio.dto";
import { ModificarEjercicioDto } from "../dto/modificar-ejercicio.dto";

@Injectable()
export class EjerciciosService {
    constructor(@InjectRepository(Ejercicio) private ejerciciosRepo: Repository<Ejercicio>) { }

    async obtenerEjercicios(): Promise<Ejercicio[]> {
        const ejercicios: Ejercicio[] = await this.ejerciciosRepo.find();

        if (ejercicios.length == 0) {
            throw new NotFoundException(
                'No existen ejercicios en la base de datos.',
            );
        }

        return ejercicios;
    }

    async obtenerEjercicioPorId(idEjercicio: number): Promise<Ejercicio> {
        const ejercicio = await this.ejerciciosRepo.findOne({
            where: {
                idEjercicio: idEjercicio
            },
        });

        if (!ejercicio) {
            throw new NotFoundException(
                'No existe un ejercicio con esta ID de ejercicio.',
            );
        }

        return ejercicio;
    }

    async obtenerEjercicioPorNombre(nombre: string): Promise<Ejercicio> {
        const ejercicio: Ejercicio = await this.ejerciciosRepo.findOne({
            where: {
                ejercicio: nombre
            }
        });

        if (!ejercicio) {
            throw new NotFoundException(
                'No existe el ejercicio "' + ejercicio.toString() + '" en la base de datos.',
            );
        }

        return ejercicio;
    }

    async crearEjercicio(crearEjercicioDto: CrearEjercicioDto): Promise<Ejercicio> {
        const ejercicio = new Ejercicio();

        ejercicio.ejercicio = crearEjercicioDto.ejercicio;

        await this.ejerciciosRepo.save(ejercicio);

        return ejercicio;
    }

    async modificarEjercicio(id: number, modificarEjercicioDto: ModificarEjercicioDto): Promise<Ejercicio> {
        const ejercicio: Ejercicio = await this.ejerciciosRepo.findOne({ where: { idEjercicio: id } });

        if (!ejercicio) {
            throw new Error('No se encontró un ejercicio con la ID especificada.');
        }

        ejercicio.ejercicio = modificarEjercicioDto.ejercicio;

        await this.ejerciciosRepo.save(ejercicio);

        return ejercicio;
    }

    async eliminarEjercicio(id: number): Promise<void> {
        const ejercicio = await this.obtenerEjercicioPorId(id);

        if (!ejercicio) {
            throw new NotFoundException('No se encontró un ejercicio con la ID especificada.');
        }

        await this.ejerciciosRepo.remove(ejercicio);
    }
}