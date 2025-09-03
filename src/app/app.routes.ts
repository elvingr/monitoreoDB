import { Routes } from '@angular/router';
import { TiemposBackups } from './templates/tiempos-backups/tiempos-backups';
import { PaginaNoEncontrada } from './shared/pagina-no-encontrada/pagina-no-encontrada';
import { SaludBackups } from './templates/salud-backups/salud-backups';
import { RecursosServidores } from './templates/recursos-servidores/recursos-servidores';
import { RegistroBaseDatos } from './templates/registro-base-datos/registro-base-datos';
import { TestDbConexion } from './templates/test-db-conexion/test-db-conexion';
import { Backups } from './templates/backups/backups';

export const routes: Routes = [
    {
        path: 'tiempos-backups',
        component: TiemposBackups
    },
    {
        path: 'salud-backups',
        component: SaludBackups
    },
    {
        path: 'recursos-servers',
        component: RecursosServidores
    },
    {   
        path: 'pagina-no-encontrada',
        component: PaginaNoEncontrada
    },
    {
        path: 'registro-base-datos',
        component: RegistroBaseDatos
    },
    {
        path: 'test-db-conexion',
        component: TestDbConexion
    },
    {
        path: 'backups',
        component: Backups
    },
    {   
        path: '**',
        redirectTo: 'pagina-no-encontrada'
    }
];
