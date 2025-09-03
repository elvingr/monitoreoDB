import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-no-encontrada',
  imports: [RouterModule],
  templateUrl: './pagina-no-encontrada.html',
  styleUrl: './pagina-no-encontrada.css'
})
export class PaginaNoEncontrada {

  public route = inject(Router);

  goBack(){
    this.route.navigate(['tiempos-backups']);
  }

}

