import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaDto } from '../../services/categorias/categoria.dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, FontAwesomeModule],
  providers: [HttpClientModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})

export class CategoriasComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faClose = faClose;

  categorias: any[] = [];

  busqueda: string = ''; // Parámetro de busqueda

  categoriaSeleccionada: CategoriaDto | null = null; // Categoría seleccionada para editar
  categoriaDto: CategoriaDto = new CategoriaDto(); // Dto para el form de crear y editar

  isModalOpen = false; // Determina si el modal con el form para crear y editar está abierto
  editing = false; // Determina si se está editando una categoría

  sortColumn: string = ''; // Columna siendo ordenada
  sortDirection: boolean = true; // Ascendente si es verdadero, descendente si es falso

  constructor(private categoriasService: CategoriasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Hubo un error al cargar las categorías:', error);
        alert(error.error.message);
      }
    );
  }

  get filteredCategorias(): any[] {
    if (!this.busqueda) {
      return this.categorias;  // Retorna todos las categorias si no hay ningún término de busqueda
    }

    return this.categorias.filter(categoria =>
      categoria.tipo.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriasService.eliminarCategoria(id).subscribe(
        () => {
          this.loadCategorias();  // Recarga la lista tras eliminar la categoría
        },
        error => {
          console.error('Error al eliminar la categoría:', error);
          alert(error.error.message);
        }
      );
    }
  }

  crearCategoria() {
    this.editing = false // Confirma que no se está editando una categoría (en caso de que se haya editado una previamente)
    this.isModalOpen = true; // Abre el modal con el form para crear la categoría
  }

  modificarCategoria(id: number) {
    this.categoriasService.obtenerCategoriaPorId(id).subscribe(
      (categoria: CategoriaDto) => {
        this.categoriaSeleccionada = categoria;
        this.categoriaDto = { ...categoria }; // Llena el form con los datos de la categoría siendo editada
        this.editing = true; // Confirma que se está editando una categoría (para evitar crear una nueva)
        this.isModalOpen = true; // Abre el modal con el form para editar la categoría
      },
      (error) => {
        console.error('Hubo un error tratando de obtener la categoría a editar:', error);
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.editing && this.categoriaSeleccionada) { // Chequéa si hay una categoria seleccionada y si la misma se está editando
      this.categoriasService.modificarCategoria(Number(this.categoriaSeleccionada.idCategoria), this.categoriaDto).subscribe(
        response => {
          this.categoriaDto = new CategoriaDto(); // Reinicia los valores del form
          this.isModalOpen = false; // Cierra el modal
          this.loadCategorias(); // Vuelve a cargar las categorías
        },
        error => {
          console.error('Error al modificar la categoría:', error);
          alert(error.error.message);
        }
      );
    } else { // Implica que se está creando una categoría
      this.categoriasService.crearCategoria(this.categoriaDto).subscribe(
        response => {
          this.loadCategorias(); // Vuelve a cargar las categorías
          this.isModalOpen = false; // Cierra el modal
          this.categoriaDto = new CategoriaDto(); // Reinicia los valores del form
          alert("Categoría creada con exito!");
        },
        error => {
          console.error('Error al crear la categoría:', error);
          alert(error.error.message);
        }
      );
    }
  }

  ordenarCategorias(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true; // Cambia la dirección al clickear la columna
    this.sortColumn = column; // Cambia la columna siendo ordenada

    this.filteredCategorias.sort((a, b) => {
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
      this.categoriaDto = new CategoriaDto();
    }
  } 

  isAdmin(): boolean {
    return this.authService.getRol() == "Profesor";
  }

}
