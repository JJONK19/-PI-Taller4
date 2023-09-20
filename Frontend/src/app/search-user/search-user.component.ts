import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent {
  registro: string = '';
  results: any[] = [];

  constructor(private router: Router, private analizarService: LogicaService) {}

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }

  buscarUsuario() {
    const data = {
      registro: this.registro
    }

    this.analizarService.searchUser(data).subscribe(data => {
      this.results = data;
    })
  }

  verUsuario(registro: string) {
    this.analizarService.setPerfil(registro);
    this.router.navigate(['/profile'])
  }
}

