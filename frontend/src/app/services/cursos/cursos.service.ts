import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoDto } from './curso.dto';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  //private apiUrl = 'localhost:3000/api/cursos';
  private apiUrl = "https://gimnasio-backend-1orh.onrender.com/api/cursos"

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerCursoPorId(id: number): Observable<CursoDto> {
    return this.http.get<CursoDto>(`${this.apiUrl}/buscarPorId?id=${id}`);
  }

  crearCurso(cursoDto: CursoDto): Observable<CursoDto> {
    cursoDto.idCategoria = Number(cursoDto.idCategoria);
    return this.http.post<CursoDto>(this.apiUrl, cursoDto);
  }

  modificarCurso(id: number | undefined, cursoDto: CursoDto): Observable<CursoDto> {
    return this.http.put<CursoDto>(`${this.apiUrl}/modificarCurso/${id}`, cursoDto);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarCurso/${id}`)
  }
}