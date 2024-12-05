import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Elemento } from "../entities/elemento.entity";
import { CrearElementoDto } from "../dto/crear-elemento.dto";
import { ModificarElementoDto } from "../dto/modificar-elemento.dto";
import { TipoElemento } from "../entities/tipo-elemento.entity";
import { CrearTipoElementoDto } from "../dto/crear-tipo-elemento.dto ";
import { ModificarTipoElementoDto } from "../dto/modificar-tipo-elemento.dto";

@Injectable()
export class ElementosService {
    constructor(
        @InjectRepository(Elemento) private elementosRepo: Repository<Elemento>,
        @InjectRepository(TipoElemento) private tipoElementosRepo: Repository<TipoElemento>
    ) { }

    async obtenerElementos(): Promise<Elemento[]> {
        const elementos: Elemento[] = await this.elementosRepo.find();

        if (elementos.length == 0) {
            throw new NotFoundException(
                'No existen elementos en la base de datos.',
            );
        }

        return elementos;
    }

    async obtenerTipoDeElementos(): Promise<TipoElemento[]> {
        const tipoElementos: TipoElemento[] = await this.tipoElementosRepo.find();

        if (tipoElementos.length == 0) {
            throw new NotFoundException(
                'No existen tipos de elementos en la base de datos.',
            );
        }

        return tipoElementos;
    }

    async obtenerElementoPorId(idElemento: number): Promise<Elemento> {
        const elemento = await this.elementosRepo.findOne({
            where: {
                idElemento: idElemento
            },
        });

        if (!elemento) {
            throw new NotFoundException(
                'No existe un elemento con esta ID de elemento.',
            );
        }

        return elemento;
    }

    async obtenerTipoDeElementoPorId(idTipoElemento: number): Promise<TipoElemento> {
        const tipoElemento = await this.tipoElementosRepo.findOne({
            where: {
                idTipoElemento: idTipoElemento
            },
        });

        if (!tipoElemento) {
            throw new NotFoundException(
                'No existe un tipo de elemento con esta ID de tipo de elemento.',
            );
        }

        return tipoElemento;
    }

    async obtenerElementosPorTipoDeElemento(idTipoElemento: number): Promise<Elemento[]> {
        const elemento = await this.elementosRepo.find({
            where: {
                idTipoElemento: idTipoElemento
            },
        });

        if (!elemento) {
            throw new NotFoundException(
                'No existen elementos con esta ID de tipo de elemento.',
            );
        }

        return elemento;
    }

    // TODO Implementar en caso de ser necesario.
    async obtenerElementosPorDescripcion(descripcion: string): Promise<Elemento[]> {
        return;
    }

    // TODO Implementar en caso de ser necesario.
    async obtenerCantidadDeElemento(idElemento: number): Promise<number> {
        return;
    }

    async obtenerTipoDeElementosPorNombre(nombre: string): Promise<TipoElemento[]> {
        const tipoElementos: TipoElemento[] = await this.tipoElementosRepo.find({
            where: {
                nombre: Like(`%${nombre}%`),
            }
        });

        if (!tipoElementos) {
            throw new NotFoundException(
                'No existen tipos de elementos con nombres similares.',
            );
        }

        return tipoElementos;
    }

    async crearElemento(crearElementoDto: CrearElementoDto): Promise<Elemento> {
        const elemento = new Elemento();

        const tipoElemento: TipoElemento = await this.obtenerTipoDeElementoPorId(crearElementoDto.idTipoElemento);

        if (!tipoElemento) {
            throw new NotFoundException(
                'El tipo de elemento especificado no existe en la base de datos.'
            );
        }

        elemento.idTipoElemento = crearElementoDto.idTipoElemento;
        elemento.descripcion = crearElementoDto.descripcion;
        elemento.cantidad = crearElementoDto.cantidad;

        await this.elementosRepo.save(elemento);

        return elemento;
    }

    async crearTipoDeElemento(crearTipoElementoDto: CrearTipoElementoDto): Promise<TipoElemento> {
        const tipoElemento = new TipoElemento();

        tipoElemento.nombre = crearTipoElementoDto.nombre;

        await this.tipoElementosRepo.save(tipoElemento);

        return tipoElemento;
    }

    async modificarElemento(id: number, modificarElementoDto: ModificarElementoDto): Promise<Elemento> {
        const elemento: Elemento = await this.elementosRepo.findOne({ where: { idElemento: id } });

        if (!elemento) {
            throw new NotFoundException('No se encontró un elemento con la ID especificada.');
        }

        if (modificarElementoDto.idTipoElemento !== undefined) {
            const tipoElemento: TipoElemento = await this.obtenerTipoDeElementoPorId(modificarElementoDto.idTipoElemento);

            if (tipoElemento) {
                elemento.idTipoElemento = modificarElementoDto.idTipoElemento;
            } else {
                throw new NotFoundException('No se encontró un tipo de elemento conn la ID especificada.')
            }
        }

        if (modificarElementoDto.descripcion !== undefined) {
            elemento.descripcion = modificarElementoDto.descripcion;
        }

        if (modificarElementoDto.cantidad !== undefined) {
            elemento.cantidad = modificarElementoDto.cantidad;
        }

        await this.elementosRepo.save(elemento);

        return elemento;
    }

    async modificarTipoDeElemento(id: number, modificarTipoElementoDto: ModificarTipoElementoDto): Promise<TipoElemento> {
        const tipoElemento: TipoElemento = await this.tipoElementosRepo.findOne({ where: { idTipoElemento: id } });

        if (!tipoElemento) {
            throw new NotFoundException('No se encontró un tipo de elemento con la ID especificada.');
        }

        tipoElemento.nombre = modificarTipoElementoDto.nombre;

        await this.tipoElementosRepo.save(tipoElemento);

        return tipoElemento;
    }

    async eliminarElemento(id: number): Promise<void> {
        const elemento = await this.obtenerElementoPorId(id);

        if (!elemento) {
            throw new NotFoundException('No se encontró un elemento con la ID especificada.');
        }

        await this.elementosRepo.remove(elemento);
    }

    async eliminarTipoDeElemento(id: number): Promise<void> {
        const tipoElemento = await this.obtenerTipoDeElementoPorId(id);

        if (!tipoElemento) {
            throw new NotFoundException('No se encontró un tipo de elemento con la ID especificada.');
        }

        await this.tipoElementosRepo.remove(tipoElemento);
    }
}