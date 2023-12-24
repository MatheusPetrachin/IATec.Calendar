import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './AuthService';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loading: boolean = false;
  form: FormGroup;

  constructor(private authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.authService.showLoginLoader.subscribe(
      show => {
        this.loading = show
      }
    );
  }

  submit() {
    this.authService.showLoginLoader.emit(true);
    var user = this.form.value as UserModel;

    if (this.form.valid) {
      this.authService.login(user);
    }
  }

  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();
}
