import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return localStorage.getItem('Authorization') !== null;
  }

  login(credentials: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/Login`, credentials, { headers, responseType: 'text' })
  }
}
