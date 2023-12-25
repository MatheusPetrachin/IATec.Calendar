import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(String) userName!: String;

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
        this.userName = localStorage.getItem('UserName') ?? '';
        this.showToolbar = show
      }
    );
  }
}
