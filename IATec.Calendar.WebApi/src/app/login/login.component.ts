import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './AuthService';
import { UserModel } from './user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showToolbar: boolean = false;

  form: FormGroup;

  constructor(private authService: AuthService, private _formBuilder: FormBuilder, private router: Router) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  submit() {
    var user = this.form.value as UserModel;

    if (this.form.valid) {
      this.authService.login(user)
        .subscribe({
          next: (response) => {
            localStorage.setItem('Authorization', 'Bearer ' + response)
            this.router.navigate(['/home']);
          },
          error: (erro) => {
            console.log(erro.message);

            if (erro.status === 404) {
              alert("Usuário ou Senha inválido(s)!");
            } else {
              alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
          }
        });
    }
  }
  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();
}
