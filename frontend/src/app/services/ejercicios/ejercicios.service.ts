import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EjercicioDto } from './ejercicio.dto';

@Injectable({
  providedIn: 'root',
})
export class EjerciciosService {
  //private apiUrl = 'http://vb6enjoyer.ddns.net:3000/api/ejercicios';
  private apiUrl = "http://vb6enjoyer.ddns.net:3000/api/ejercicios"

  constructor(private http: HttpClient) { }

  obtenerEjercicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerEjercicioPorId(id: number): Observable<EjercicioDto> {
    return this.http.get<EjercicioDto>(`${this.apiUrl}/buscarPorId?id=${id}`);
  }

  crearEjercicio(ejercicioDto: EjercicioDto): Observable<EjercicioDto> {
    return this.http.post<EjercicioDto>(this.apiUrl, ejercicioDto);
  }

  modificarEjercicio(id: number, ejercicioDto: EjercicioDto): Observable<EjercicioDto> {
    return this.http.put<EjercicioDto>(`${this.apiUrl}/modificarEjercicio/${id}`, ejercicioDto);
  }

  eliminarEjercicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarEjercicio/${id}`)
  }
}