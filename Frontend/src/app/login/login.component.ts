import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log('Datos del formulario enviados:', this.formData);
    this.formData = {
      username: '',
      password: ''
    };
    // Puedes hacer una solicitud HTTP aquí para autenticar al usuario
    // y redirigirlo a la página de inicio de sesión exitosa.
  }
  
}
