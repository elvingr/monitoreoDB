
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BackupsService } from '../../core/services/backups.service';
import { TabData } from '../../core/interfaces/tiempos.intefaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recursos-servidores',
  imports: [CommonModule],
  templateUrl: './recursos-servidores.html',
  styleUrl: './recursos-servidores.css'
})
export class RecursosServidores {

  constructor() {
    this.llamarServerNameRecursos();
  }

    // asegúrate de limpiar al destruir el componente
  ngOnDestroy() {
    this.lastSub?.unsubscribe();
  }

  backupService = inject(BackupsService);
  currentHeaders: string[] = [];
  tabs: TabData[] = [];
  loading = true;

  private lastSub: Subscription | null = null;

  public llamarRecursosServidores(serverId: number | undefined) {
    // cancelar la petición anterior (si existe)
    if (this.lastSub) {
      this.lastSub.unsubscribe();
      this.lastSub = null;
    }
    // guardar la nueva suscripción para poder cancelarla si llega otra llamada
    this.lastSub = this.backupService.getServerRecursos(serverId).subscribe({
      next: (resultado: any[]) => {
        if (resultado.length) {
          this.currentHeaders = Object.keys(resultado[0]);
          this.mapToCards(resultado);
          console.log(resultado);
        } else {
          // si llegara vacío, también manejalo si corresponde
          this.currentHeaders = [];
          this.mapToCards([]);
        }
        this.loading = false;
        // ya terminó, limpiamos la referencia
        this.lastSub = null;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.lastSub = null;
      }
    });
  }

  public llamarServerNameRecursos() {
    this.backupService.getServerNameRecursos().subscribe({
      next: (resultado: any) => {
        this.tabs = resultado;
        this.llamarRecursosServidores(this.tabs[0].id_conexion_db);
        this.tabs[0].active = true;
        console.log(resultado);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  switchTab(indice: number, serverId: number | undefined) {
    this.tabs.forEach((tab, index) => {
      tab.active = indice == index;
    });
    this.loading = true;
    this.llamarRecursosServidores(serverId);
  }

  cards: Array<{ title: string; icon: string; metrics: { label: string; value: string }[]; progress?: number }> = [];


  mapToCards(data: any[]): void {
    const getValor = (detalle: string) => data.find(d => d.Detalle.toLowerCase().includes(detalle.toLowerCase()))?.Valor || '0';

    const parseNum = (val: string) => parseFloat(val) || 0;

    const ramUsada = parseNum(getValor('RAM Usada'));
    const ramTotal = parseNum(getValor('RAM Total'));
    const ramDisponible = parseNum(getValor('RAM Disponible'));
    const ramPercent = parseNum(getValor('Porcentaje RAM Usado'));

    const cpuFisicos = getValor('CPUs Físicos');
    const cpuLogicos = getValor('CPUs Lógicos');
    const cpuHyper = getValor('Ratio Hyperthread');

    const discosTotal = getValor('Espacio Total');
    const discosUsado = getValor('Espacio Usado');
    const discosLibre = getValor('Espacio Disponible');
    const discosCantidad = getValor('Cantidad de Discos');

    const bdOnline = getValor('Online');
    const bdTotal = getValor('Total Bases');

    const conActivas = getValor('Conexiones Activas');
    const conShared = getValor('Memoria Compartida');
    const conTcp = getValor('Conexiones TCP');

    this.cards = [
      {
        title: 'Memoria RAM',
        icon: 'fas fa-memory',
        metrics: [
          { label: 'Usada', value: `${ramUsada.toFixed(2)} GB` },
          { label: 'Disponible', value: `${ramDisponible.toFixed(2)} GB` },
          { label: 'Total', value: `${ramTotal.toFixed(2)} GB` }
        ],
        progress: +ramPercent.toFixed(2)
      },
      {
        title: 'CPU',
        icon: 'fas fa-microchip',
        metrics: [
          { label: 'Lógicos', value: cpuLogicos },
          { label: 'Físicos', value: cpuFisicos },
          { label: 'Hyperthread Ratio', value: cpuHyper }
        ]
      },
      {
        title: 'Discos',
        icon: 'fas fa-hdd',
        metrics: [
          { label: 'Cantidad', value: discosCantidad },
          { label: 'Total', value: `${parseNum(discosTotal).toFixed(2)} GB` },
          { label: 'Libre', value: `${parseNum(discosLibre).toFixed(2)} GB` },
          { label: 'Usado', value: `${parseNum(discosUsado).toFixed(2)} GB` }
        ]
      },
      {
        title: 'Bases de Datos',
        icon: 'fas fa-database',
        metrics: [
          { label: 'Online', value: bdOnline },
          { label: 'Total', value: bdTotal }
        ]
      },
      {
        title: 'Conexiones',
        icon: 'fas fa-network-wired',
        metrics: [
          { label: 'Activas', value: conActivas },
          { label: 'Shared Memory', value: conShared },
          { label: 'TCP', value: conTcp }
        ]
      }
    ];
    console.log(this.cards)
  }
}

