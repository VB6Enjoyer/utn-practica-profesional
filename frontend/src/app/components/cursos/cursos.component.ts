import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../guards/auth.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { CursoDto } from '../../services/cursos/curso.dto';
import { CursosService } from '../../services/cursos/cursos.service';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})

export class CursosComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faCheck = faCheck;
  faClose = faClose;

  cursos: any[] = [];
  categorias: any[] = [];

  cursoSeleccionado: CursoDto | null = null; // curso seleccionado para editar
  cursoDto: CursoDto = new CursoDto(); // Dto para el form de crear y editar

  busqueda: string = ''; // Parámetro de busqueda

  isModalOpen = false; // Determina si el modal con el form para crear y editar está abierto
  editing = false; // Determina si se está editando un curso

  sortColumn: string = ''; // Columna siendo ordenada
  sortDirection: boolean = true; // Ascendente si es verdadero, descendente si es falso

  constructor(private cursosService: CursosService, private usuariosService: UsuariosService, private categoriasService: CategoriasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCategorias();
    if (this.isAlumno()) {
      this.loadCursosDelAlumno();
    } else {
      this.loadCursos();
    }
  }

  loadCursosDelAlumno(): void {
    const usuarioId = this.getUsuarioID();
    if (usuarioId !== null) {
      this.usuariosService.obtenerUsuarioPorId(usuarioId).subscribe(data => {
        this.cursos = data.cursos;
        this.matchCategoriaNames();
      })
    } else {
      console.log('Usuario ID es nulo');
    }
  }

  loadCursos(): void {
    this.cursosService.obtenerCursos().subscribe(
      (data) => {
        this.cursos = data; // Assign the response data to the cursos array
        this.matchCategoriaNames();
      },
      (error) => {
        console.error('Error fetching cursos:', error);
        alert(error.error.message);
      }
    );
  }

  loadCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
        this.matchCategoriaNames(); // Match category names once both are fetched
      },
      (error) => {
        console.error('Error fetching categorias:', error);
        alert(error.error.message);
      }
    );
  }

  get filteredCursos(): any[] {
    const busqueda = this.busqueda?.toLowerCase() || '';
    if (!busqueda) {
      return this.cursos;  // If no search term, return all cursos
    }

    return this.cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminarCurso(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.cursosService.eliminarCurso(id).subscribe(
        () => {
          this.loadCursos();  // Recarga la lista tras eliminar el curso
        },
        error => {
          console.error('Error al eliminar el curso:', error);
          alert(error.error.message);
        }
      );
    }
  }

  crearCurso() {
    this.editing = false // Confirma que no se está editando un curso (en caso de que se haya editado uno previamente)
    this.isModalOpen = true; // Abre el modal con el form para crear el curso
  }

  modificarCurso(id: number) {
    this.cursosService.obtenerCursoPorId(id).subscribe(
      (curso: any) => {
        this.cursoSeleccionado = curso;
        this.cursoDto = { ...curso }; // Fill the form with course data being edited
        this.editing = true; // Flag indicating that the course is being edited
        this.isModalOpen = true; // Open the modal with the form for editing

        // Manually populate the 'dias' array based on the response from the backend
        this.cursoDto.dias = [
          curso.lunes || false,     // Lunes
          curso.martes || false,    // Martes
          curso.miercoles || false, // Miércoles
          curso.jueves || false,    // Jueves
          curso.viernes || false,   // Viernes
          curso.sabado || false,    // Sábado
          curso.domingo || false    // Domingo
        ];
      },
      (error) => {
        console.error('Hubo un error tratando de obtener el curso a editar:', error);
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    const cursoDtoModificado: CursoDto = {
      dias: [
        this.cursoDto.dias[0],
        this.cursoDto.dias[1],
        this.cursoDto.dias[2],
        this.cursoDto.dias[3],
        this.cursoDto.dias[4],
        this.cursoDto.dias[5],
        this.cursoDto.dias[6]
      ],
      idCategoria: Number(this.cursoDto.idCategoria),
      nombre: this.cursoDto.nombre,
      fechaInicio: new Date(this.cursoDto.fechaInicio),
      fechaFin: new Date(this.cursoDto.fechaFin)
    };

    if (this.editing && this.cursoSeleccionado) { // Chequéa si hay una curso seleccionado y si el mismo se está editando 
      this.cursosService.modificarCurso(this.cursoSeleccionado.idCurso, cursoDtoModificado).subscribe(
        response => {
          console.log('Curso modificado con éxito:', response);
          this.cursoDto = new CursoDto();
          this.isModalOpen = false;
          this.loadCursos();
        },
        error => {
          console.error('Error al modificar el curso:', error);
          alert(error.error.message)
        }
      );
    } else { // Implica que se está creando una categoría
      this.cursosService.crearCurso(this.cursoDto).subscribe(
        response => {
          this.loadCursos(); // Vuelve a cargar las categorías
          this.isModalOpen = false; // Cierra el modal
          this.cursoDto = new CursoDto(); // Reinicia los valores del form
          alert("Curso creado con exito!");
        },
        error => {
          console.error('Error al crear el curso:', error);
          alert(error.error.message);
        }
      );
    }
  }

  ordenarCursos(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true; // Cambia la dirección al clickear la columna
    this.sortColumn = column; // Cambia la columna siendo ordenada

    this.filteredCursos.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection ? -1 : 1; // Cambia el orden entre ascendiente y descendente
      } else if (aValue > bValue) {
        return this.sortDirection ? 1 : -1;
      }
      return 0; // Iguala los valores
    });
  }

  matchCategoriaNames(): void {
    if (this.cursos.length && this.categorias.length) {
      const categoriasMap = this.categorias.map((cat) => ({ idCategoria: cat.idCategoria, tipo: cat.tipo }));
      this.cursos.forEach((curso) => {
        const categoria = categoriasMap.find((cat) => cat.idCategoria === curso.idCategoria);
        if (categoria) {
          curso.categoriaTipo = categoria.tipo;
        }
      });
    }
  }

  cerrarForm() {
    this.isModalOpen = false;
    if (this.editing) {
      this.cursoDto = new CursoDto();
    }
  }

  isAlumno(): boolean {
    return this.authService.getRol() == "Alumno";
  }

  isAdmin(): boolean {
    return this.authService.getRol() == "Profesor";
  }

  getUsuarioID(): string | null {
    return this.authService.getUsuarioId();
  }
}