import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceService {
  public apiUrl = 'https://localhost:5001';
}
