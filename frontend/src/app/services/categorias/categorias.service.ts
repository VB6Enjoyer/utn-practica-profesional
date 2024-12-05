import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDto } from './categoria.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  //private apiUrl = 'http://vb6enjoyer.ddns.net:3000/api/categorias';
  private apiUrl = "http://vb6enjoyer.ddns.net:3000/api/categorias";

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(this.apiUrl);
  }

  obtenerCategoriaPorId(id: number): Observable<CategoriaDto> {
    return this.http.get<CategoriaDto>(`${this.apiUrl}/buscarPorId?id=${id}`);
  }

  crearCategoria(categoriaDto: CategoriaDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.apiUrl, categoriaDto);
  }

  modificarCategoria(id: number, categoriaDto: CategoriaDto): Observable<CategoriaDto> {
    return this.http.put<CategoriaDto>(`${this.apiUrl}/modificarCategoria/${id}`, categoriaDto);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarCategoria/${id}`)
  }
}