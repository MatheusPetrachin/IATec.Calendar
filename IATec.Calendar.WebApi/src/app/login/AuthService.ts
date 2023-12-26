import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';
import { ApiConfigServiceService } from '../app-config.service';
import { ToastService } from '../app-toast.service';
import { ProgressBarService } from '../app-progress.bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,
    private router: Router,
    private _toastService: ToastService,
    private progressBarService: ProgressBarService) { }

  showToolbarEmitter = new EventEmitter<boolean>();

  isLoggedIn(): boolean {
    this.showToolbarEmitter.emit(true);
    return localStorage.getItem('Authorization') !== null;
  }

  login(credentials: UserModel): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post<UserModel>(`${this.configService.apiUrl}/Login`, credentials, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem('UserId', response.id)
        localStorage.setItem('UserName', response.name)
        localStorage.setItem('Authorization', 'Bearer ' + response.token)
        this.router.navigate(['/home']);
        this.progressBarService.showLoad(false);
      },
      error: (error) => {
        console.log(error.message);

        if (error.status === 404) {
          this._toastService.error("Usuário ou Senha inválido(s)!");
        } else {
          this._toastService.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }

        this.progressBarService.showLoad(false);
      }
    });
  }

  logout() {
    this.showToolbarEmitter.emit(false);
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);

    return false;
  }
}
