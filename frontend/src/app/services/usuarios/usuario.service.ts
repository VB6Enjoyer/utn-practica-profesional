import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    private apiUrl = 'https://gimnasio-backend-1orh.onrender.com/api/usuarios';  // Asegúrate de que la URL sea correcta

    constructor(private http: HttpClient) { }


    // En tu servicio
    obtenerUsuarioPorId(idUsuario: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/buscarPorId?id=${idUsuario}`);
    }
}
