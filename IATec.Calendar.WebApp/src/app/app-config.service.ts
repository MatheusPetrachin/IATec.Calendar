import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceService {
  public apiUrl = 'http://localhost:8050';
}
