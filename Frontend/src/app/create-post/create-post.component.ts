import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  catedratico: string = '';
  contenido: string = '';
  catedraticos: string[] = []; 

  constructor(private router: Router, private analizarService: LogicaService) {}

  ngOnInit(): void {
    this.analizarService.getCursosExistentes().subscribe(cursos => {
      this.catedraticos = cursos;
    })
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }

  publicar() {
    const partes = this.catedratico.split(" - ")
    const data = {
      fecha: new Date(),
      mensaje: this.contenido,
      usuario: this.analizarService.getUsername(),
      curso: partes[0], 
      catedratico: partes[1]
    }

    //Hacer la petición
    this.analizarService.publicar(data).subscribe((res:any)=>{
      this.router.navigate(['/home'])
    }, err=>{
      console.log(err)
    })
  }
}
