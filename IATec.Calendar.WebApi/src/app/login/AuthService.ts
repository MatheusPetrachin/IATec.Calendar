import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { UserModel } from './user-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient, private router: Router) { }

  showToolbarEmitter = new EventEmitter<boolean>()

  isLoggedIn(): boolean {
    this.showToolbarEmitter.emit(true);
    return localStorage.getItem('Authorization') !== null;
  }

  login(credentials: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    this.showToolbarEmitter.emit(true);

    return this.http.post(`${this.apiUrl}/Login`, credentials, { headers, responseType: 'text' })
  }

  logout() {
    this.showToolbarEmitter.emit(false);
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);

    return false;
  }
}
