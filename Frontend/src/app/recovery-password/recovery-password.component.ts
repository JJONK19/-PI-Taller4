import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogicaService } from 'src/app/logica/logica.service';

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

  message = ''
  response = { mensaje: '-1' }

  constructor(private analizarService: LogicaService, private formBuilder: FormBuilder) {}

  onSubmit() {
    //Crear la data 
    const data = {
      registro: this.formData.username,
      password: this.formData.password,
      correo: this.formData.correo
    } 

    //Hacer la petición
    this.analizarService.recoveryUsuario(data).subscribe((res:any)=>{
      this.response = res;
      if (res.mensaje === '1') {
        this.message = 'Mensaje: Contraseña cambiada correctamente.';
      } else if (res.mensaje === '0' || res.mensaje === '2') {
        this.message = 'Error: Correo y/o usuario invalido.';
      }
    }, err=>{
      console.log(err)
      this.response = { mensaje: '2' };
      this.message = 'Error: No se pudo completar la solicitud.';
    })
  }
}
