import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElementoDto } from './elemento.dto';

@Injectable({
  providedIn: 'root',
})
export class ElementosService {
  //private apiUrl = 'http://vb6enjoyer.ddns.net:3000/api/elementos';
  private apiUrl = "http://vb6enjoyer.ddns.net:3000/api/elementos"

  constructor(private http: HttpClient) { }

  obtenerElementos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "/elemento");
  }

  obtenerTipoElementos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "/tipoElemento");
  }

  obtenerElementoPorId(id: number): Observable<ElementoDto> {
    return this.http.get<ElementoDto>(`${this.apiUrl}/buscarElementoPorId?id=${id}`)
  }

  crearElemento(elementoDto: ElementoDto): Observable<ElementoDto> {
    return this.http.post<ElementoDto>(this.apiUrl + "/crearElemento", elementoDto)
  }

  modificarElemento(id: number, elementoDto: ElementoDto): Observable<ElementoDto> {
    return this.http.put<ElementoDto>(`${this.apiUrl}/modificarElemento/${id}`, elementoDto)
  }

  eliminarElemento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarElemento/${id}`)
  }
}