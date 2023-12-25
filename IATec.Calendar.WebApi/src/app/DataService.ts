import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiConfigServiceService } from './ApiConfigServiceService';
import { EventModel } from './models/eventmodel';
import { UserModel } from './models/usermodel';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';
import { AuthService } from './login/AuthService';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  reloadTable = new EventEmitter<boolean>();
  loadingFormsEventEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,
    private authService: AuthService,
    private _toastService: ToastService,
    private router: Router) { }

  getListEventData(userId: string, date: Date): Observable<EventModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'userid': userId,
      'period': date.toUTCString()
    });
    return this.http.get<EventModel[]>(this.configService.apiUrl + "/Events", { headers });
  }

  getEventById(id: string): Observable<EventModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? ''
    });
    return this.http.get<EventModel>(this.configService.apiUrl + "/Events/" + id, { headers });
  }

  createEvent(event: EventModel): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    this.http.post<EventModel>(this.configService.apiUrl + "/Events", event, { headers }).subscribe({
      next: (response) => {
        this._toastService.success('Criado com sucesso!');
        this.loadingFormsEventEmitter.emit(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error)
        this._toastService.error(error.error);
        this.loadingFormsEventEmitter.emit(false);
      }
    });
  }

  updateEvent(event: EventModel): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    this.http.put<EventModel>(this.configService.apiUrl + "/Events/" + event.id, event, { headers }).subscribe({
      next: (response) => {
        this._toastService.success('Atualizado com sucesso!');
        this.loadingFormsEventEmitter.emit(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this._toastService.error(error.error);
        this.loadingFormsEventEmitter.emit(false);
      }
    });
  }

  deleteEvent(id: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    this.http.delete(this.configService.apiUrl + "/Events/" + id, { headers }).subscribe({
      next: (response) => {
        this._toastService.success('Removido com sucesso!');
        this.loadingFormsEventEmitter.emit(false);
        this.reloadTable.emit(true)
      },
      error: (error) => {
        this._toastService.success('Erro ao remover!');
        this.loadingFormsEventEmitter.emit(false);
      }
    });
  }

  createUser(user: UserModel): Observable<UserModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<UserModel>(this.configService.apiUrl + "/Users", user, { headers });
  }

  selectUsers(): Observable<UserModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? ''
    });

    return this.http.get<UserModel[]>(this.configService.apiUrl + "/Users/All", { headers });
  }
}
