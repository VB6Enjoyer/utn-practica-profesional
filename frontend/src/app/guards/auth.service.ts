// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'localhost:3000/api/auth/login';
  private apiUrl = "https://gimnasio-backend-1orh.onrender.com/api/auth/login"

  getRol(): string {
    const token: any = localStorage.getItem('token');
    const decoded: any = jwtDecode(token);
    return decoded.rol;
  }

  getNombreUsuario(): string {
    const token: any = localStorage.getItem('token');
    const decoded: any = jwtDecode(token);
    return decoded.nombre;
  }

  getUsuarioId(): string {
    const token: any = localStorage.getItem('token');
    const decoded: any = jwtDecode(token);
    return decoded.sub;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  logout(): void {
    localStorage.clear();

    /*
      Necesitamos realizar esta redirección, ya que si cerramos sesión y retrodecemos
      a la página anterior, esta nos va a devolver al inicio, a pesar de haber borrado el token
    */
    window.location.href = '/login';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
