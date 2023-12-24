import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/usermodel';
import { Router } from '@angular/router';
import { ApiConfigServiceService } from '../ApiConfigServiceService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,
    private router: Router) { }

  showToolbarEmitter = new EventEmitter<boolean>();
  showLoginLoader = new EventEmitter<boolean>();

  isLoggedIn(): boolean {
    this.showToolbarEmitter.emit(true);
    return localStorage.getItem('Authorization') !== null;
  }

  login(credentials: UserModel): void {
    this.showLoginLoader.emit(true);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.showToolbarEmitter.emit(true);

    this.http.post<UserModel>(`${this.configService.apiUrl}/Login`, credentials, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem('UserName', response.name)
        localStorage.setItem('Authorization', 'Bearer ' + response.token)
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

    this.showToolbarEmitter.emit(true);
    this.showLoginLoader.emit(false);
  }

  logout() {
    this.showToolbarEmitter.emit(false);
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);

    return false;
  }
}
