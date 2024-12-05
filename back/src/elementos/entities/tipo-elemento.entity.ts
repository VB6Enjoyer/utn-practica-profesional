import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipo_elemento' })
export class TipoElemento {
    @PrimaryGeneratedColumn({ name: 'idTipo_Elemento' })
    idTipoElemento: number

    @Column({ name: 'Nombre' })
    nombre: string
}