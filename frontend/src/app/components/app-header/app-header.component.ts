import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../guards/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit {

  faChevronDown = faChevronDown;
  faDoorOpen = faDoorOpen;

  title = 'Gimnasio Municipal';
  isNavbarOpen = false;

  constructor(private router: Router, private authService: AuthService) { }
  
  navItems = [
    { path: '/home', label: 'Inicio', access: false },
    { path: '/categorias', label: 'Categorías', access: true },
    { path: '/cursos', label: 'Cursos', access: false },
    { path: '/ejercicios', label: 'Ejercicios', access: true },
    { path: '/elementos', label: 'Elementos', access: true },
    { path: '/rutinas', label: 'Rutinas', access: false }
  ]; 
  
  ngOnInit(): void {
    if(this.isAlumno()) {
      this.navItems = this.navItems.map(item => {
        if (item.path === '/cursos') {
          return { ...item, label: 'Mis cursos' };
        }
        if (item.path === '/rutinas') {
          return { ...item, label: 'Mis rutinas' };
        }
        return item;
      });     
    }
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  } 

  logout() {
    this.authService.logout();
  }

  isAlumno(): boolean {
    return this.authService.getRol() == "Alumno";
  }

  getNombreUsuario(): string | null {
    return this.authService.getNombreUsuario();
  }
}