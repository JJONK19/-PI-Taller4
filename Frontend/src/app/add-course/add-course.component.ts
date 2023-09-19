import { Component } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  constructor(private router: Router, private analizarService: LogicaService) {}

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }
}
