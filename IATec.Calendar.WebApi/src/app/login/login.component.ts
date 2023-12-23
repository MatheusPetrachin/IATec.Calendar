import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service.service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('email'),
    password: new FormControl('password'),
  });

  user = this.form.value as UserModel;

  submit() {
    console.log("email: " + this.user.email);
    console.log("senha: " + this.user.password);

    this.authService.login(this.user)
      .subscribe({
        next: (response) => {
          localStorage.setItem('Authorization', 'Bearer ' + response)
        },
        error: (erro) => {
          console.log(erro.message);

          if (erro.status === 401) {
            alert("Usuário ou Senha inválido(s)!");
          } else {
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          }

          console.log(erro);
        }
      });

  }
  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();
}
