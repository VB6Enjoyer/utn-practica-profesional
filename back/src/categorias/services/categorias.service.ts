import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { ModalidadesEnum } from "../enums/modalidades.enum";
import { CrearCategoriaDto } from "../dto/crear-categoria.dto";
import { ModificarCategoriaDto } from "../dto/modificar-categoria.dto";

@Injectable()
export class CategoriasService {
    constructor(@InjectRepository(Categoria) private categoriasRepo: Repository<Categoria>) { }

    async obtenerCategorias(): Promise<Categoria[]> {
        const categorias: Categoria[] = await this.categoriasRepo.find();

        if (categorias.length == 0) {
            throw new NotFoundException(
                'No existen categorías en la base de datos.',
            );
        }

        return categorias;
    }

    async obtenerCategoriaPorId(idCategoria: number): Promise<Categoria> {
        const categoria = await this.categoriasRepo.findOne({
            where: {
                idCategoria: idCategoria
            },
        });

        if (!categoria) {
            throw new NotFoundException(
                'No existe una categoría con esta ID de categoría.',
            );
        }

        return categoria;
    }

    async obtenerCategoriaPorTipo(tipo: string, modalidad: ModalidadesEnum): Promise<Categoria> {
        const categoria: Categoria = await this.categoriasRepo.findOne({
            where: {
                tipo: tipo,
                modalidad: modalidad
            }
        });

        if (!categoria) {
            throw new NotFoundException(
                'No existe una categoría con este tipo en la modalidad ' + modalidad.toString().toLowerCase + ".",
            );
        }

        return categoria;
    }

    // TODO Sería mejor obtener la categoría por un range de pesos.
    async obtenerCategoriaPorPeso(peso: number): Promise<Categoria> {
        const categoria: Categoria = await this.categoriasRepo.findOne({
            where: {
                peso: peso
            }
        });

        if (!categoria) {
            throw new NotFoundException(
                'No existe una categoría con este peso.',
            );
        }

        return categoria;
    }

    async obtenerCategoriasPorModalidad(modalidad: ModalidadesEnum): Promise<Categoria[]> {
        const categorias: Categoria[] = await this.categoriasRepo.find({
            where: {
                modalidad: modalidad,
            }
        });

        if (!categorias || categorias.length == 0) {
            throw new NotFoundException(
                'No se encontró ninguna categoría ' + modalidad.toString().toLowerCase + ' en la base de datos.',
            );
        }

        return categorias;
    }

    async crearCategoria(crearCategoriaDto: CrearCategoriaDto): Promise<Categoria> {
        const categoria = new Categoria();

        categoria.tipo = crearCategoriaDto.tipo;
        categoria.peso = crearCategoriaDto.peso;
        categoria.modalidad = crearCategoriaDto.modalidad;

        await this.categoriasRepo.save(categoria);

        return categoria;
    }

    async modificarCategoria(id: number, modificarCategoriaDto: ModificarCategoriaDto): Promise<Categoria> {
        const categoria: Categoria = await this.categoriasRepo.findOne({ where: { idCategoria: id } });

        if (!categoria) {
            throw new Error('No se encontró una categoría con la ID especificada.');
        }

        if (modificarCategoriaDto.tipo !== undefined) {
            categoria.tipo = modificarCategoriaDto.tipo;
        }

        if (modificarCategoriaDto.peso !== undefined) {
            categoria.peso = modificarCategoriaDto.peso;
        }

        if (modificarCategoriaDto.modalidad !== undefined) {
            categoria.modalidad = modificarCategoriaDto.modalidad;
        }

        await this.categoriasRepo.save(categoria);

        return categoria;
    }

    async eliminarCategoria(id: number): Promise<void> {
        const categoria = await this.obtenerCategoriaPorId(id);

        if (!categoria) {
            throw new NotFoundException('No se encontró una categoría con la ID especificada.');
        }

        await this.categoriasRepo.remove(categoria);
    }
}