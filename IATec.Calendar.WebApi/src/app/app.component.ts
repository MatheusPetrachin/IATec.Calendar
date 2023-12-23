import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userName!: string;
  showToolbar: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logout();
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }

  ngOnInit() {
    this.authService.showToolbarEmitter.subscribe(
      show => {
        this.showToolbar = show
      }
    );

    this.userName = localStorage.getItem('UserName') ?? '';
  }
}
