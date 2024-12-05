import { Rutina } from 'src/rutinas/entities/rutina.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ejercicio' })
export class Ejercicio {
    @PrimaryGeneratedColumn({ name: 'idEjercicio' })
    idEjercicio: number

    @Column({ name: 'Ejercicio' })
    ejercicio: string 

    @ManyToMany(() => Rutina, (rutina) => rutina.ejercicios, { eager: false })
    @JoinTable({
      name: 'ejercicio_rutina',
      joinColumn: { name: 'idEjercicio', referencedColumnName: 'idEjercicio' }, 
      inverseJoinColumn: { name: 'idRutina', referencedColumnName: 'idRutina' }
    })
    rutinas: Rutina[];
}