
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BackupsService } from '../../core/services/backups.service';
import { TabData } from '../../core/interfaces/tiempos.intefaces';

@Component({
  selector: 'app-salud-backups',
    imports: [CommonModule],
  templateUrl: './salud-backups.html',
  styleUrl: './salud-backups.css'
})


export class SaludBackups {

  constructor() {
    this.llamarServerNameSalud();
  }

  backupService = inject(BackupsService);
  currentHeaders: string[] = [];
  currentData: any[] = [];
  tabs: TabData[] = [];

  public llamarSaludBackups(serverName: string) {
    this.backupService.getBackupsSalud(serverName).subscribe({
      next: (resultado: any[]) => {
        if (resultado.length) {
          this.currentHeaders = Object.keys(resultado[0]);
          this.currentData = resultado;
          console.log(resultado);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public llamarServerNameSalud() {
    this.backupService.getServerNameSalud().subscribe({
      next: (resultado: any) => {
        this.tabs = resultado;
        this.llamarSaludBackups(this.tabs[0].ServerName);
        this.tabs[0].active = true;
        console.log(resultado)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  switchTab(indice: number, serverName: string) {
    this.tabs.forEach((tab, index) => {
      tab.active = indice == index;
    });
    this.llamarSaludBackups(serverName);
  }
}
