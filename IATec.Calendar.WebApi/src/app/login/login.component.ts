import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginForm!: FormGroup;
  cadForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.showLoginLoader.subscribe(
      show => {
        this.loading = show
      }
    );

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.cadForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  submitLogin() {
    var user = this.loginForm.value as UserModel;

    if (this.loginForm.valid) {
      this.authService.showLoginLoader.emit(true);
      this.authService.login(user);
    }
  }

  submitCad() {
    var user = this.cadForm.value as UserModel;

    if (this.cadForm.valid)
      console.log(user);
  }

  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();
}
