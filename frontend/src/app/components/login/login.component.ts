import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../guards/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  onSubmit() {
    //this.httpClient.post('http://vb6enjoyer.ddns.net:3000/api/auth/login', { username: this.username, password: this.password })
    this.httpClient.post('http://vb6enjoyer.ddns.net:3000/api/auth/login', { username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Hubo un error al loguearse:', error);
          alert(error.error.message);
        }
      );
  }

}
