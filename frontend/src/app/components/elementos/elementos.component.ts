import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ElementosService } from '../../services/elementos/elementos.service';
import { FormsModule } from '@angular/forms';
import { ElementoDto } from '../../services/elementos/elemento.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-elementos',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './elementos.component.html',
  styleUrl: './elementos.component.css'
})

export class ElementosComponent implements OnInit { 

  faEdit = faEdit;
  faTrash = faTrash;
  faClose = faClose;

  elementos: any[] = [];
  tipoElementos: any[] = [];

  busqueda: string = ''; // Parámetro de busqueda

  elementoSeleccionado: ElementoDto | null = null; // Elemento seleccionado para editar
  elementoDto: ElementoDto = new ElementoDto(); // Dto para el form de crear y editar

  isModalOpen = false; // Determina si el modal con el form para crear y editar está abierto
  editing = false; // Determina si se está editando un elemento

  sortColumn: string = ''; // Columna siendo ordenada
  sortDirection: boolean = true; // Ascendente si es verdadero, descendente si es falso

  constructor(private elementosService: ElementosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTipoElementos();
    this.loadElementos();
  }

  loadElementos(): void {
    this.elementosService.obtenerElementos().subscribe(
      (data) => {
        this.elementos = data; // Assign the response data to the elementos array
        this.emparejarElementoConTipo();
      },
      (error) => {
        console.error('Hubo un error al cargar los elementos:', error);
        alert(error.error.message);
      }
    );
  }

  loadTipoElementos(): void {
    this.elementosService.obtenerTipoElementos().subscribe(
      (data) => {
        this.tipoElementos = data; // Assign the response data to the elementos array
      },
      (error) => {
        console.error('Hubo un error al cargar los tipos de eleemntos:', error);
        alert(error.error.message);
      }
    );
  }

  emparejarElementoConTipo(): void {
    if (this.elementos.length && this.tipoElementos.length) {

      this.elementos.forEach((elemento) => {
        const tipo = this.tipoElementos.find((tipEle) => tipEle.idTipoElemento === elemento.idTipoElemento)
        if (tipo) {
          elemento.tipo = tipo.nombre;
        }
      });
    }
  }

  get filteredElementos(): any[] {
    if (!this.busqueda) {
      return this.elementos;  // Retorna todos las elementos si no hay ningún término de busqueda
    }

    return this.elementos.filter(elemento =>
      elemento.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminarElemento(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      this.elementosService.eliminarElemento(id).subscribe(
        () => {
          this.loadElementos();  // Recarga la lista tras eliminar el elemento
        },
        error => {
          console.error('Error al eliminar el elemento:', error);
          alert(error.error.message);
        }
      );
    }
  }

  crearElemento() {
    this.editing = false // Confirma que no se está editando una elemento (en caso de que se haya editado una previamente)
    this.isModalOpen = true; // Abre el modal con el form para crear la elemento
  }

  modificarElemento(id: number) {
    this.elementosService.obtenerElementoPorId(id).subscribe(
      (elemento: ElementoDto) => {
        this.elementoSeleccionado = elemento;
        this.elementoDto = { ...elemento }; // Llena el form con los datos del elemento siendo editado
        this.editing = true; // Confirma que se está editando un elemento (para evitar crear uno nuevo)
        this.isModalOpen = true; // Abre el modal con el form para editar el elemento
      },
      (error) => {
        console.error('Hubo un error tratando de obtener el elemento a editar:', error);
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.elementoDto.idTipoElemento) {
      this.elementoDto.idTipoElemento = Number(this.elementoDto.idTipoElemento) // Se asegura de tomar el ID del tipo de elemento para enviarlo
    }

    if (this.editing && this.elementoSeleccionado) { // Chequéa si hay un elemento seleccionado y si el mismo se está editando
      this.elementosService.modificarElemento(Number(this.elementoSeleccionado.idElemento), this.elementoDto).subscribe(
        response => {
          this.elementoDto = new ElementoDto(); // Reinicia los valores del form
          this.isModalOpen = false; // Cierra el modal
          this.loadElementos(); // Vuelve a cargar los elementos
        },
        error => {
          console.error('Error al modificar el elemento:', error);
          alert(error.error.message);
        }
      );
    } else { // Implica que se está creando un elemento
      this.elementosService.crearElemento(this.elementoDto).subscribe(
        response => {
          this.loadElementos(); // Vuelve a cargar los elementos
          this.isModalOpen = false; // Cierra el modal
          this.elementoDto = new ElementoDto(); // Reinicia los valores del form
          alert("Elemento creado con exito!");
        },
        error => {
          console.error('Error al crear el elemento:', error);
          alert(error.error.message);
        }
      );
    }
  }

  ordenarElementos(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true; // Cambia la dirección al clickear la columna
    this.sortColumn = column; // Cambia la columna siendo ordenada

    this.filteredElementos.sort((a, b) => {
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
      this.elementoDto = new ElementoDto();
    }
  }

  isAdmin(): boolean {
    return this.authService.getRol() == "Profesor";
  }
}