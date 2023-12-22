import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  meuFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      // adicione mais campos conforme necessário
    });
  }

  submitForm() {
    // Lógica para manipular o envio do formulário
    console.log(this.meuFormulario.value);

    //   const credentials = {
    //     username: this.meuFormulario
    //   };

    //   this.authService.login(credentials).subscribe(
    //     (response) => {
    //       // Manipular o token retornado pela API
    //       const token = response.token;
    //       console.log('Token:', token);
    //     },
    //     (error) => {
    //       // Lidar com erros de autenticação
    //       console.error('Erro de autenticação:', error);
    //     }
    //   );
  }
}
