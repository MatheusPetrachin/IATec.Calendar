import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showToolbar: boolean = false;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.showToolbarEmitter.subscribe(
      show => this.showToolbar = show
    );
  }
}
