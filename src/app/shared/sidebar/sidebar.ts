import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from '../../core/interfaces/tiempos.intefaces';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  menuItems: MenuItem[] = [
    { id: 'tiempos-backups',  title: 'Tiempos Backups', icon: 'fas fa-stopwatch', active: true, ruta: 'tiempos-backups' },
    { id: 'salud-backups',    title: 'Salud Backups', icon: 'fas fa-heartbeat', active: false, ruta: 'salud-backups' },
    { id: 'recursos-servers', title: 'Recursos', icon: 'fas fa-server', active: false, ruta: 'recursos-servers' },
    { id: 'test-db', title: 'Test Conexion', icon: 'fa-solid fa-charging-station', active: false, ruta: 'test-db-conexion' },
    { id: 'backups', title: 'Backups', icon: 'fas fa-database', active: false, ruta: 'backups' },
    { id: 'registrar-db', title: 'Registrar DB', icon: 'fas fa-plus-circle', active: false, ruta: 'registro-base-datos' },
  ];

  switchModule(moduleId: string) {
    this.menuItems.forEach(item => {
      item.active = item.id === moduleId;
    });
  }
}