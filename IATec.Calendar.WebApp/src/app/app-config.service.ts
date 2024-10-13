import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceService {
  public apiUrl = 'https://iatec-calendar-backend.fly.dev';
}
