import { Curso } from 'src/cursos/entities/curso.entity';
import { Ejercicio } from 'src/ejercicios/entities/ejercicio.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rutina' })
export class Rutina {
    @PrimaryGeneratedColumn({ name: 'idRutina' })
    idRutina: number

    @Column({ name: 'idCategoria' })
    idCategoria: number // * Hace referencia a la ID de una entrada en la tabla 'categoria'.

    @Column({ name: 'Nombre' })
    nombre: string

    @Column({ name: 'Horario' })
    horario: string // ! No existe un tipo 'time' en TS, abría que ver que queda mejor acá. 

    @ManyToMany(() => Curso, (curso) => curso.rutinas, { eager: false })
    @JoinTable({
      name: 'curso_has_rutina',
      joinColumn: { name: 'Rutina_idRutina', referencedColumnName: 'idRutina' }, 
      inverseJoinColumn: { name: 'Curso_idCurso', referencedColumnName: 'idCurso' }
    })
    cursos: Curso[]; 

    @ManyToMany(() => Ejercicio, (ejercicio) => ejercicio.rutinas, { eager: false })
    ejercicios: Ejercicio[];
}