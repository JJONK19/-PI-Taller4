import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogicaService } from 'src/app/logica/logica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };

  message = ''
  response = { mensaje: '-1' }

  constructor(private router: Router, private analizarService: LogicaService, private formBuilder: FormBuilder) {}

  onSubmit() {
    //Crear la data 
    const data = {
      registro: this.formData.username,
      password: this.formData.password
    }
    
    //Hacer la petición
    this.analizarService.loginUsuario(data).subscribe((res:any)=>{
      this.response = res;
      if (res.mensaje === '1') {
        this.analizarService.login(this.formData.username)
        this.router.navigate(['/home'])
      } else if (res.mensaje === '0') {
        this.message = 'Error: La contraseña o el usuario son incorrectos.';
      } else if (res.mensaje === '2') {
        this.message = 'Error: La contraseña o el usuario son incorrectos.';
      }
    }, err=>{
      console.log(err)
      this.response = { mensaje: '2' };
      this.message = 'Error: La contraseña o el usuario son incorrectos';
    })
  }
  
}
