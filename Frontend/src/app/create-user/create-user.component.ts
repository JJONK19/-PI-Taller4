import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  formData = {
    username: '',
    nombres: '',
    apellidos: '',
    correo: '',
    password: '', 
    passwordConfirm: ''
  };

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log('Datos del formulario enviados:', this.formData);
    this.formData = {
      username: '',
      nombres: '',
      apellidos: '',
      correo: '',
      password: '', 
      passwordConfirm: ''
    };
    // Puedes hacer una solicitud HTTP aquí para autenticar al usuario
    // y redirigirlo a la página de inicio de sesión exitosa.
  }
  
}
