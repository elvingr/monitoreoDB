
import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { Notificaciones } from './shared/notificaciones/notificaciones';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Sidebar, Notificaciones],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  moduleTitle: string = 'Gestión de Usuarios';
  currentTab: string = 'overview';

}