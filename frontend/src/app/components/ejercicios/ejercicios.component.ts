import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios/ejercicios.service';
import { FormsModule } from '@angular/forms';
import { EjercicioDto } from '../../services/ejercicios/ejercicio.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.css'
})
export class EjerciciosComponent implements OnInit { 

  faEdit = faEdit;
  faTrash = faTrash;
  faClose = faClose; 
  
  ejercicios: any[] = [];

  busqueda: string = ''; // Parámetro de busqueda

  ejercicioSeleccionado: EjercicioDto | null = null; // Ejercicio seleccionado para editar
  ejercicioDto: EjercicioDto = new EjercicioDto(); // Dto para el form de crear y editar

  isModalOpen = false; // Determina si el modal con el form para crear y editar está abierto
  editing = false; // Determina si se está editando un ejercicio

  sortColumn: string = ''; // Columna siendo ordenada
  sortDirection: boolean = true; // Ascendente si es verdadero, descendente si es falso

  constructor(private ejerciciosService: EjerciciosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadEjercicios();
  }

  loadEjercicios(): void {
    this.ejerciciosService.obtenerEjercicios().subscribe(
      (data) => {
        this.ejercicios = data;
      },
      (error) => {
        console.error('Hubo un error al cargar los ejercicios:', error);
        alert(error.error.message);
      }
    );
  }

  get filteredEjercicios(): any[] {
    if (!this.busqueda) {
      return this.ejercicios;  // If no search term, return all ejercicios
    }

    return this.ejercicios.filter(ejercicio =>
      ejercicio.ejercicio.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminarEjercicio(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      this.ejerciciosService.eliminarEjercicio(id).subscribe(
        () => {
          this.loadEjercicios();  // Recarga la lista tras eliminar el ejercicio
        },
        error => {
          console.error('Error al eliminar el ejercicio:', error);
          alert(error.error.message);
        }
      );
    }
  }

  crearEjercicio() {
    this.editing = false // Confirma que no se está editando un ejercicio (en caso de que se haya editado uno previamente)
    this.isModalOpen = true; // Abre el modal con el form para crear el ejercicio
  }

  modificarEjercicio(id: number) {
    this.ejerciciosService.obtenerEjercicioPorId(id).subscribe(
      (ejercicio: EjercicioDto) => {
        this.ejercicioSeleccionado = ejercicio;
        this.ejercicioDto = { ...ejercicio }; // Llena el form con los datos del ejercicio siendo editado
        this.editing = true; // Confirma que se está editando un ejercicio (para evitar crear uno nuevo)
        this.isModalOpen = true; // Abre el modal con el form para editar el ejercicio
      },
      (error) => {
        console.error('Hubo un error tratando de obtener el ejercicio a editar:', error);
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.editing && this.ejercicioSeleccionado) { // Chequéa si hay una ejercicio seleccionado y si l mismo se está editando
      this.ejerciciosService.modificarEjercicio(Number(this.ejercicioSeleccionado.idEjercicio), this.ejercicioDto).subscribe(
        response => {
          this.ejercicioDto = new EjercicioDto(); // Reinicia los valores del form
          this.isModalOpen = false; // Cierra el modal
          this.loadEjercicios(); // Vuelve a cargar los ejercicios
        },
        error => {
          console.error('Error al modificar el ejercicio:', error);
          alert(error.error.message);
        }
      );
    } else { // Implica que se está creando un curso
      this.ejerciciosService.crearEjercicio(this.ejercicioDto).subscribe(
        response => {
          this.loadEjercicios(); // Vuelve a cargar los ejercicios
          this.isModalOpen = false; // Cierra el modal
          this.ejercicioDto = new EjercicioDto(); // Reinicia los valores del form
          alert("Ejercicio creado con exito!");
        },
        error => {
          console.error('Error al crear el ejercicio:', error);
          alert(error.error.message);
        }
      );
    }
  }

  ordenarEjercicios(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true; // Cambia la dirección al clickear la columna
    this.sortColumn = column; // Cambia la columna siendo ordenada

    this.filteredEjercicios.sort((a, b) => {
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

  cerrarForm() {
    this.isModalOpen = false;
    if (this.editing) {
      this.ejercicioDto = new EjercicioDto();
    }
  }

  isAdmin(): boolean {
    return this.authService.getRol() == "Profesor";
  }
}