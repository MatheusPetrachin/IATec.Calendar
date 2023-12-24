import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiConfigServiceService } from './ApiConfigServiceService';
import { EventModel } from './models/eventmodel';
import { UserModel } from './models/usermodel';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  reloadTable = new EventEmitter<boolean>();
  loadingFormsEventEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,
    private messageService: MessageService,
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
        console.log('Sucesso');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sucesso!' });
        this.loadingFormsEventEmitter.emit(false);
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.log('erro');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro!' });
        this.loadingFormsEventEmitter.emit(false);
      }
    });
  }

  updateEvent(event: EventModel) {
    console.log("UPDATE");
  }

  deleteEvent(id: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    this.http.delete(this.configService.apiUrl + "/Events/" + id, { headers }).subscribe({
      next: (response) => {
        console.log('Sucesso');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sucesso!' });
        this.loadingFormsEventEmitter.emit(false);
        this.reloadTable.emit(true)
      },
      error: (erro) => {
        console.log('erro');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro!' });
        this.loadingFormsEventEmitter.emit(false);
      }
    });
  }

  selectUsers(): Observable<UserModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? ''
    });

    return this.http.get<UserModel[]>(this.configService.apiUrl + "/Users/All", { headers });
  }
}
