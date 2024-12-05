import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'elemento_trabajo' })
export class Elemento {
    @PrimaryGeneratedColumn({ name: 'idElemento_Trabajo' })
    idElemento: number

    @Column({ name: 'idTipo_Elemento' })
    idTipoElemento: number // * Hace referencia a la ID de un 'tipo_elemento'.

    @Column({ name: 'descripcion' })
    descripcion: string

    @Column({ name: 'cantidad' })
    cantidad: number
}