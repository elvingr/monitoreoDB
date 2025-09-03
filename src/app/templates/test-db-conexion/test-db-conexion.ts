import { Component, inject } from '@angular/core';
import { BackupsService } from '../../core/services/backups.service';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import { CommonModule } from '@angular/common';
import { mergeMap, tap, catchError, toArray } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-test-db-conexion',
  imports: [CommonModule],
  templateUrl: './test-db-conexion.html',
  styleUrl: './test-db-conexion.css'
})
export class TestDbConexion {
  backupService = inject(BackupsService);
  currentHeaders: string[] = [];
  conexiones_db: any[] = [];
  public notifService = inject(NotificacionesService);
  connectionResults: { [id: number]: { status: 'pending' | 'success' | 'warning' | 'error', message?: string, ok?: number } } = {};

  constructor() {
    this.llamarConexionesDB();
  }

  llamarConexionesDB() {
    this.backupService.getConexionesDB().subscribe({
      next: (resultado: any) => {
        this.currentHeaders = Object.keys(resultado[0]);
        this.conexiones_db = resultado;
        // === Aquí: justo después de recibir y asignar conexiones_db ===
        this.conexiones_db.forEach((c: any) => {
          const id = c['ID'];
          // inicializa sólo si no existe (evita sobrescribir estados ya actualizados)
          if (!this.connectionResults[id]) {
            this.connectionResults[id] = { status: 'pending' };
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  llamarValidarConexionDB2(id: number) {
    // marca como pendiente inmediatamente
    this.connectionResults[id] = { status: 'pending' };

    this.backupService.getValidarConexionDB2(id).subscribe({
      next: (resultado: any) => {
        if (resultado && resultado.ok === 1) {
          this.connectionResults[id] = { status: 'success', ok: resultado.ok, message: resultado.mensaje || 'Conexión OK' };
          this.notifService.show(`ID ${id}: Conexión exitosa`, 'success');
        } else {
          this.connectionResults[id] = { status: 'warning', ok: resultado?.ok ?? 0, message: resultado?.mensaje || 'Revisar conexión' };
          this.notifService.show(`ID ${id}: Revisar la conexión`, 'warning');
        }
      },
      error: (err) => {
        console.error('Error en conexión id', id, err);
        this.connectionResults[id] = { status: 'error', message: err?.message || 'Error de red' };
        this.notifService.show(`ID ${id}: Conexión fallida`, 'error');
      }
    });
  }

  probarTodasConexiones(concurrency = 5) {
    this.notifService.decision('¿Deseas probar todas las conexion?', (respuesta: boolean) => {
      if (respuesta) {
        const ids = this.conexiones_db.map((c: any) => c['ID']);

        // inicializar estados
        ids.forEach(id => this.connectionResults[id] = { status: 'pending' });

        from(ids).pipe(
          mergeMap(id =>
            this.backupService.getValidarConexionDB2(id).pipe(
              tap((resultado: any) => {
                if (resultado && resultado.ok === 1) {
                  this.connectionResults[id] = { status: 'success', ok: resultado.ok, message: resultado.mensaje || 'Conexión OK' };
                  this.notifService.show(`ID ${id}: Conexion exitosa`, 'success');
                } else {
                  this.connectionResults[id] = { status: 'warning', ok: resultado?.ok ?? 0, message: resultado?.mensaje || 'Revisar conexión' };
                  this.notifService.show(`ID ${id}: Revisar la conexion`, 'warning');
                }
              }),
              catchError(err => {
                // no propagar el error para no cancelar todo
                console.error('Error en id', id, err);
                this.connectionResults[id] = { status: 'error', message: err.message || 'Error de red' };
                this.notifService.show(`ID ${id}: Conexion Fallida`, 'error');
                return of(null); // continúa con los demás
              })
            )
            , concurrency),
          // opcional: agrupar resultados finales en un array
          toArray()
        ).subscribe({
          next: () => { },
          complete: () => {
            // resumen final
            const resultados = Object.entries(this.connectionResults).map(([id, r]) => ({ id: +id, ...r }));
            const exitosas = resultados.filter(r => r.status === 'success').length;
            const fallidas = resultados.filter(r => r.status === 'error' || r.status === 'warning').map(r => ({ id: r.id, status: r.status, message: r.message }));
            console.log('Resumen:', { exitosas, fallidas });
            // mostrar resumen final si quieres
            this.notifService.show(`Prueba finalizada: ${exitosas} OK, ${fallidas.length} Fallidas/Advertencias`, 'info');
          }
        });
      }
    });
  }
}
