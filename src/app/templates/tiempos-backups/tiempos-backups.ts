import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BackupsService } from '../../core/services/backups.service';
import { TabData } from '../../core/interfaces/tiempos.intefaces';

@Component({
  selector: 'app-tiempos-backups',
  imports: [CommonModule],
  templateUrl: './tiempos-backups.html',
  styleUrl: './tiempos-backups.css'
})
export class TiemposBackups {

  constructor() {
    this.llamarServerName();
  }

  backupService = inject(BackupsService);
  currentHeaders: string[] = [];
  currentData: any[] = [];
  tabs: TabData[] = [];

  public llamarTiemposBackups(serverName: string) {
    this.backupService.getBackupsTiempo(serverName).subscribe({
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

  public llamarServerName() {
    this.backupService.getServerName().subscribe({
      next: (resultado: any) => {
        this.tabs = resultado;
        this.llamarTiemposBackups(this.tabs[0].ServerName);
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
    this.llamarTiemposBackups(serverName);
  }
}
