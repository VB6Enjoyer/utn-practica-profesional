import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ModalidadesEnum } from '../enums/modalidades.enum';

@Entity({ name: 'categoria' })
export class Categoria {
    @PrimaryGeneratedColumn({ name: 'idCategoria' })
    idCategoria: number

    @Column({ name: 'Tipo' })
    tipo: string

    @Column({ name: 'Peso' })
    peso: number

    @Column({ name: 'Modalidad' })
    modalidad: ModalidadesEnum
}