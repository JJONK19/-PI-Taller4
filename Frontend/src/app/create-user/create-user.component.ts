import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LogicaService } from 'src/app/logica/logica.service';

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

  message = ''
  response = { mensaje: -1 }

  constructor(private analizarService: LogicaService, private formBuilder: FormBuilder) {}

  onSubmit() {
    //Crear la data 
    const data = {
      registro: this.formData.username,
      nombres: this.formData.nombres,
      apellidos: this.formData.apellidos,
      password: this.formData.password,
      correo: this.formData.correo
    } 

    //Reiniciar el formulario
    this.formData = {
      username: '',
      nombres: '',
      apellidos: '',
      correo: '',
      password: '', 
      passwordConfirm: ''
    };

    //Hacer la petición
    this.analizarService.crearUsuario(data).subscribe((res:any)=>{
      this.response = res;
      if (res.mensaje === 1) {
        this.message = 'Mensaje: Usuario creado correctamente.';
      } else if (res.mensaje === 0) {
        this.message = 'Error: El usuario ya existe.';
      }
    }, err=>{
      console.log(err)
      this.response = { mensaje: 2 };
      this.message = 'Error: No se pudo completar la solicitud.';
    })
  } 
  
}
