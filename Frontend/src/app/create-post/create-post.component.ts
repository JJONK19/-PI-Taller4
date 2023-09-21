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
  cursos: string[] = []; 

  constructor(private router: Router, private analizarService: LogicaService) {}

  ngOnInit(): void {
    this.analizarService.setPerfil("")
    
    this.analizarService.getCursosExistentes().subscribe(cursos => {
      this.cursos = cursos;
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
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " "); 

    const data = {
      fecha: formattedDate,
      mensaje: this.contenido,
      usuario: this.analizarService.getUsername(),
      curso: partes[1],
      catedratico: partes[0]
    };
    
    this.analizarService.publicar(data).subscribe((res:any)=>{
      this.router.navigate(['/home'])
    }, err=>{
      console.log(err)
    })
  }
}
