import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutinaDto } from './rutina.dto';

@Injectable({
  providedIn: 'root',
})
export class RutinasService {
  //private apiUrl = 'localhost:3000/api/rutinas';
  private apiUrl = "https://gimnasio-backend-1orh.onrender.com/api/rutinas";

  constructor(private http: HttpClient) { }

  obtenerRutinas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerRutinaPorId(id: number): Observable<RutinaDto> {
    return this.http.get<RutinaDto>(`${this.apiUrl}/buscarPorId?id=${id}`)
  }

  crearRutina(rutinaDto: RutinaDto): Observable<RutinaDto> {
    return this.http.post<RutinaDto>(this.apiUrl, rutinaDto);
  }

  modificarRutina(id: number, rutinaDto: RutinaDto): Observable<RutinaDto> {
    return this.http.put<RutinaDto>(`${this.apiUrl}/modificarRutina/${id}`, rutinaDto)
  }

  eliminarRutina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarRutina/${id}`)
  }
}