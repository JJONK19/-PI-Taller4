import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit{
  selectedCategory: string = 'Curso';
  postName: string = '';
  results: any[] = []; 

  constructor(private router: Router, private analizarService: LogicaService, private datePipe: DatePipe) {}
  
  ngOnInit() {
    this.analizarService.setPerfil("")
  }
  
  buscarPost() {
    const data = {
      nombre: this.postName
    }

    if(this.selectedCategory === 'Curso'){
      this.analizarService.searchPublicacionCurso(data).subscribe(data => {
        this.results = data;
      })

    }else{
      this.analizarService.searchPublicacionCatedratico(data).subscribe(data => {
        this.results = data;
      })
    }
  }

  verPost(id: any) {
    this.analizarService.guardarPost(id);
    this.router.navigate(['/post'])
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }
}


