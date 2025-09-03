import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackupsService {

  private http: HttpClient = inject(HttpClient);

  getBackupsTiempo(server: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/monitor?server=${server}`);
  }

  getBackupsSalud(server: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/server-salud-backups?server=${server}`);
  }

  getServerName() {
    return this.http.get(`http://localhost:3000/server-name`);
  }

  getServerNameSalud() {
    return this.http.get(`http://localhost:3000/server-name-salud`);
  }

  getServerNameRecursos() {
    return this.http.get(`http://localhost:3000/server-name-recursos`);
  }

  postDeleteConexionDB(id: number) {
    return this.http.post(`http://localhost:3000/delete-conexion`, { 'id': id });
  }

  postValidarConexionDB(data: FormData) {
    return this.http.post(`http://localhost:3000/validar-conexion`, data);
  }

  // getValidarConexionDB2(id: number) {
  //   return this.http.get<any[]>(`http://localhost:3000/validar-conexion-test?id=${id}`);
  // }
  // // servicio.ts
  getValidarConexionDB2(id: number) {
    return this.http.get<{ ok: number, mensaje?: string }>(`http://localhost:3000/validar-conexion-test?id=${id}`);
  }


  postGuardarConexionDB(data: FormData) {
    return this.http.post(`http://localhost:3000/guardar-conexion`, data);
  }

  getConexionesDB() {
    return this.http.get(`http://localhost:3000/conexiones-db`);
  }

  getServerRecursos(id: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/server-recursos?id=${id}`);
  }

}
