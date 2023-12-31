import { Component, OnInit } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userData: any;
  cursos: string[] = [];

  constructor(private router: Router, private analizarService: LogicaService) {}

  ngOnInit() {
    let data;
    //Crear la data
    if(this.analizarService.getPerfil() === ""){
      data = {
        registro: this.analizarService.getUsername()
      }
    }else{
      data = {
        registro: this.analizarService.getPerfil()
      }
    }

    this.analizarService.getCursoAprobado(data).subscribe(data => {
      this.cursos = data;
    })

    this.analizarService.getUserData(data).subscribe((data: any) => {
      this.userData = data[0];
    });
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }

  mostrarBoton(): boolean {
    return this.analizarService.getPerfil().trim() === ''; 
  }
}
