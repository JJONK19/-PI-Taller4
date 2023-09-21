import { Component } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  cursos: string[] = []
  curso: string = ""
  constructor(private router: Router, private analizarService: LogicaService) {}
  
  ngOnInit() {
    this.analizarService.setPerfil("")
    
    const data = {
      registro: this.analizarService.getUsername()
    }

    this.analizarService.getCursosPendientes(data).subscribe(cursos => {
      this.cursos = cursos
    })
  }

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }

  actualizarCursos(): void {
    const data = {
      registro: this.analizarService.getUsername()
    }

    this.analizarService.getCursosPendientes(data).subscribe(cursos => {
      this.cursos = cursos
    })
  }

  anadir(): void{
    const data = {
      curso: this.curso,
      registro: this.analizarService.getUsername()
    }

    this.analizarService.addCursoAprobado(data).subscribe(cursos => {
      this.actualizarCursos()
    })
  }

} 
