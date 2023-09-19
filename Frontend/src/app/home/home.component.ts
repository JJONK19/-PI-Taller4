import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  curso: string = ''
  catedratico: string = '' 
  cursos: string[] = []
  catedraticos: string[] = [] 
  cards: any[] = [] 
  filteredCards: any[] = []

  constructor(private router: Router, private analizarService: LogicaService) {}

  ngOnInit(): void {
    this.analizarService.getCursos().subscribe(cursos => {
      this.cursos = ['Ninguno', ...cursos];
    })

    this.analizarService.getCatedraticos().subscribe(catedraticos => {
      this.catedraticos = ['Ninguno', ...catedraticos];
    })

    this.analizarService.getPublicaciones().subscribe(publicaciones => {
      this.cards = publicaciones
    })
    
    this.filteredCards = this.cards
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }

  filtrar(): void {
    this.filteredCards = this.cards.filter((card) => {
      return (
        (this.curso === 'Ninguno' || card.curso === this.curso) &&
        (this.catedratico === 'Ninguno' || card.catedratico === this.catedratico) 
      )
    })
  }

  verPost(id: any) {
    this.analizarService.guardarPost(id);
    this.router.navigate(['/post'])
  }

}
