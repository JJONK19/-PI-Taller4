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
  cursos: string[] = []
  constructor(private router: Router, private analizarService: LogicaService) {}
  ngOnInit() {

    this.analizarService.getCursos().subscribe(cursos => {
      this.cursos = ['Ninguno', ...cursos];
    })

    const data={
      registro: this.analizarService.getUsername()

    } 
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
}
