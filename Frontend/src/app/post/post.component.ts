import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  post: any; 
  comments: any[] = []; 
  newComment: string = '';

  constructor(private router: Router, private analizarService: LogicaService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    let data = {
      post: this.analizarService.getPost()
    }

    //Obtener datos del post
    this.analizarService.getPublicacion(data).subscribe(data => {
      this.post = data;
    })

    //Obtener Comentarios
    this.analizarService.getComentarios(data).subscribe(data => {
      this.comments = data;
    })
  }

  actualizarComentarios(): void {
    let data = {
      post: this.analizarService.getPost()
    }

    //Obtener Comentarios
    this.analizarService.getComentarios(data).subscribe(data => {
      this.comments = data;
    })
  }

  agregarComentario(): void {
    if (this.newComment.trim() === '') {
      return; 
    }

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " "); 

    const data = {
      fecha: formattedDate,
      mensaje: this.newComment,
      usuario: this.analizarService.getUsername(), 
      post: this.analizarService.getPost()
    };
    console.log(data)

    this.analizarService.addComentario(data).subscribe(data => {
      this.newComment = '';
      this.actualizarComentarios();
    });
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }
} 
