import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigServiceService } from './ApiConfigServiceService';
import { EventModel } from './models/eventmodel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private configService: ApiConfigServiceService,) { }



  getListEventData(userId: string, date: Date): Observable<EventModel[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization') ?? '',
      'userid': userId,
      'period': date.toUTCString()
    });


    return this.http.get<EventModel[]>(this.configService.apiUrl + "/Events", { headers });
  }
}
