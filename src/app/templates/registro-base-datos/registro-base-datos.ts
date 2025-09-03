import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackupsService } from '../../core/services/backups.service';
import { NotificacionesService } from '../../core/services/notificaciones.service';

@Component({
  selector: 'app-registro-base-datos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-base-datos.html',
  styleUrl: './registro-base-datos.css'
})
export class RegistroBaseDatos {
  constructor() {
    this.llamarConexionesDB();
  }

  public notifService = inject(NotificacionesService);

  //   <app-notificaciones></app-notificaciones>
  // <div style="margin-top:50px;">
  //   <button (click)="notifService.show('Operación exitosa','success')">Éxito</button>
  //   <button (click)="notifService.show('Algo salió mal','error')">Error</button>
  //   <button (click)="notifService.show('Información importante','info')">Info</button>
  //   <button (click)="notifService.show('Atención requerida','warning')">Warning</button>
  //   <!-- <button (click)="notifService.decision('¿Deseas continuar?', this.handleDecision)">Sí/No</button> -->
  //   <button (click)="notifService.decision('¿Deseas continuar?', this.handleDecision)">Sí/No</button>
  // </div>

  backupService = inject(BackupsService);
  currentHeaders: string[] = [];
  conexiones_db: any[] = [];



  llamarConexionesDB() {
    this.backupService.getConexionesDB().subscribe({
      next: (resultado: any) => {
        this.currentHeaders = Object.keys(resultado[0]);
        this.conexiones_db = resultado;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  llamarEliminarConexionDB(id: number) {
    this.backupService.postDeleteConexionDB(id).subscribe({
      next: (resultado: any) => {
        const index = this.conexiones_db.findIndex(conexion => conexion['ID'] === id);
        if (index !== -1) {
          this.conexiones_db.splice(index, 1)
          console.log('Encontrado en posición:', index);
        } else {
          console.log('No encontrado');
        }
        console.log(resultado)
      }
    })
  }


  llamarGuardarValidarConexionDB(test: boolean) {
    if (this.miFormularioConexion.invalid) {
      this.miFormularioConexion.markAllAsTouched();
      console.log('FORMULARIO INVALIDO');
      return;
    };
    const data = new FormData();
    data.append('ip_db', this.miFormularioConexion.get('ip_db')?.value || '');
    data.append('puerto_db', this.miFormularioConexion.get('puerto_db')?.value || '');
    data.append('usuario_db', this.miFormularioConexion.get('usuario_db')?.value || '');
    data.append('password_db', this.miFormularioConexion.get('password_db')?.value || '');
    data.append('nombre_db', this.miFormularioConexion.get('nombre_db')?.value || '');
    data.append('server_host_db', (this.miFormularioConexion.get('server_host_db')?.value || ''));
    data.append('instancia_db', this.miFormularioConexion.get('instancia_db')?.value || '');

    const funcion = test
      ? this.backupService.postValidarConexionDB(data)
      : this.backupService.postGuardarConexionDB(data);

    funcion.subscribe({
      next: (resultado: any) => {
        console.log(resultado);
        if (!test) this.llamarConexionesDB();
        this.notifService.show('Conexion exitosa','success');
        this.miFormularioConexion.reset();
      },
      error: (err) => {
        console.error(err);
        this.notifService.show('Conexion Fallida', 'warning');
      }
    });
  }

  miFormularioConexion = new FormGroup({
    nombre_db: new FormControl('', Validators.required),
    usuario_db: new FormControl('', Validators.required),
    password_db: new FormControl('', Validators.required),
    server_host_db: new FormControl('', Validators.required),
    ip_db: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
      )
    ]),
    puerto_db: new FormControl('', Validators.required),
    instancia_db: new FormControl(''),

  });


  cancelar = (respuesta: boolean) => {
    if (respuesta) {
      this.miFormularioConexion.reset();
    }
  }


  // registro-base-datos.ts
  handleDecision(test: boolean) {
    if (this.miFormularioConexion.invalid) {
      this.miFormularioConexion.markAllAsTouched();
      console.log('FORMULARIO INVALIDO');
      this.notifService.show('Formulario incompleto', 'warning')
      return;
    };
    this.notifService.decision('¿Deseas continuar?', (respuesta: boolean) => {
      if (respuesta) {
        this.llamarGuardarValidarConexionDB(test); // Test
      }
    });
  }



  campoInvalido(formulario: FormGroup, campo: string): boolean | null {
    const formControl = formulario.get(campo);
    return formControl && formControl.invalid && (formControl.dirty || formControl.touched);
  }



}
