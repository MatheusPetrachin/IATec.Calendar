import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './AuthService';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';
import { DataService } from '../DataService';
import { ToastService } from '../toast.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ProgressBarService } from '../progressbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  loading: boolean = false;
  loginForm!: FormGroup;
  cadForm!: FormGroup;
  selectedTabIndex = 0;

  constructor(private authService: AuthService,
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router,
    private progressBarService: ProgressBarService) { }

  ngOnInit() {
    if (localStorage.getItem('Authorization') !== null)
      this.router.navigate(['/home']);

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
      this.progressBarService.showLoad(true);
      this.authService.login(user);
    }
  }

  submitCad() {
    var user = this.cadForm.value as UserModel;

    if (user.password.length < 6)
      this.cadForm.get('password')?.setErrors({ 'passwordLength': true });

    if (user.password !== user.confirmPassword)
      this.cadForm.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });

    if (this.cadForm.valid) {
      this.progressBarService.showLoad(true);

      this.dataService.createUser(user).subscribe({
        next: () => {
          this.progressBarService.showLoad(false);
          this.toastService.success('Sucesso!');
          this.cadForm.reset();
          this.resetFormValidators();
          this.tabGroup.selectedIndex = 0;
        },
        error: (error) => {
          this.progressBarService.showLoad(false);
          console.log(error)
          this.toastService.error(error.error);
        }
      });
    }
  }

  resetFormValidators() {
    Object.keys(this.cadForm.controls).forEach(key => {
      this.cadForm.get(key)?.clearValidators();
      this.cadForm.get(key)?.updateValueAndValidity();
    });
  }


  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();
}
