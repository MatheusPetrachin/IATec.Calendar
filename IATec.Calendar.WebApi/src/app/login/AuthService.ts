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

  isLoggedIn(): boolean {
    this.showToolbarEmitter.emit(true);
    return localStorage.getItem('Authorization') !== null;
  }

  getToken(credentials: UserModel): Observable<UserModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.showToolbarEmitter.emit(true);

    return this.http.post<UserModel>(`${this.configService.apiUrl}/Login`, credentials, { headers })
  }

  logout() {
    this.showToolbarEmitter.emit(false);
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);

    return false;
  }
}
