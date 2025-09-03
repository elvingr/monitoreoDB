import { Component } from '@angular/core';
import { Notification } from '../../core/interfaces/notificaciones';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})

export class Notificaciones {
  notifications: Notification[] = [];

  constructor(private notifService: NotificacionesService, private router: Router) {
    this.notifService.notifications$.subscribe(n => this.notifications = n);
    // Escuchar navegación y limpiar
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.clear();
      }
    });
  }

  close(id: number) {
    this.notifService.remove(id);
  }

  respond(id: number, value: boolean) {
    this.notifService.respond(id, value);
  }

  clear() {
    this.notifications = [];
  }
}
