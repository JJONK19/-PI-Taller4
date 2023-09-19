import { Component } from '@angular/core';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private router: Router, private analizarService: LogicaService) {}

  getUserName(): string {
    return this.analizarService.getUsername()
  }

  logout(): void {
    this.analizarService.logout()
    this.router.navigate(['/login'])
  }
}
