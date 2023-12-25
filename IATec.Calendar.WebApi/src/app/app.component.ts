import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/AuthService';
import { ProgressBarService } from './progressbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(String) userName!: String;

  showToolbar: boolean = false;
  showProgressBar: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private progressBar: ProgressBarService) { }

  logout() {
    this.authService.logout();
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }

  ngOnInit() {
    this.progressBar.progressBar.subscribe(
      show => {
        this.showProgressBar = show
      }
    );

    this.authService.showToolbarEmitter.subscribe(
      show => {
        this.userName = localStorage.getItem('UserName') ?? '';
        this.showToolbar = show
      }
    );
  }
}
