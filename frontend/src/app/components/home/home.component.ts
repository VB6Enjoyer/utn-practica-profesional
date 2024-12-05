import { Component } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Gimnasio Municipal de Concordia';
}
