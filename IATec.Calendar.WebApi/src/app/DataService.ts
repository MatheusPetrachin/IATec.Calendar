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
import { ProgressBarService } from './progressbar.service';
import { InviteModel } from './models/invitemodel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  reloadTable = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,
    private progressBarService: ProgressBarService,
    private toastService: ToastService,
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

  getListInvitesData(userId: string): Observable<InviteModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'userid': userId
    });
    return this.http.get<InviteModel[]>(this.configService.apiUrl + "/Events/Invites", { headers });
  }

  createEvent(event: EventModel): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    this.http.post<EventModel>(this.configService.apiUrl + "/Events", event, { headers }).subscribe({
      next: (response) => {
        this.toastService.success('Criado com sucesso!');
        this.progressBarService.showLoad(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error)
        this.toastService.error(error.error);
        this.progressBarService.showLoad(false);
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
        this.toastService.success('Atualizado com sucesso!');
        this.progressBarService.showLoad(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error(error.error);
        this.progressBarService.showLoad(false);
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
        this.toastService.success('Removido com sucesso!');
        this.progressBarService.showLoad(false);
        this.reloadTable.emit(true)
      },
      error: (error) => {
        this.toastService.success('Erro ao remover!');
        this.progressBarService.showLoad(false);
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
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'UserId': localStorage.getItem('UserId') ?? ''
    });

    return this.http.get<UserModel[]>(this.configService.apiUrl + "/Users/All", { headers });
  }
}
