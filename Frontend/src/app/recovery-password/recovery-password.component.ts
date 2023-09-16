import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  formData = {
    username: '',
    password: '', 
    passwordConfirm: '',
    correo: ''
  };

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log('Datos del formulario enviados:', this.formData);
    this.formData = {
      username: '',
      password: '', 
      passwordConfirm: '',
      correo: ''
    };
    // Puedes hacer una solicitud HTTP aquí para autenticar al usuario
    // y redirigirlo a la página de inicio de sesión exitosa.
  }
}
