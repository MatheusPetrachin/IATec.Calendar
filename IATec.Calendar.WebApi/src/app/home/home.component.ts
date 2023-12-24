import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/eventmodel';
import { DataService } from '../DataService';
import { AuthService } from '../login/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router, private dataService: DataService, private authService: AuthService) {
    this.obterDataAtual()
  }

  dataSource: EventModel[] = [];
  displayedColumns: string[] = ['eventDate', 'name', 'description', 'localization', 'status', 'actions'];

  date: Date = new Date();

  ngOnInit() {
    this.authService.showToolbarEmitter.emit(true);
    this.loadData(this.date)
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }

  obterDataAtual() {
    this.date = new Date();
  }

  loadData(date: Date): void {
    this.dataService.getListEventData(localStorage.getItem('UserId') ?? '', date)
      .subscribe({
        next: (response) => {
          this.dataSource = response;
        },
        error: (erro) => {
          console.log(erro.message);

          if (erro.status === 404) {
            alert("Não há eventos para hoje!");
          } else {
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          }
        }
      });
  }

  editItem(item: any): void {
    // Implement your edit logic here, e.g., open a dialog
    // where the user can edit the item
    // Example using MatDialog:
    // this.dialog.open(EditDialogComponent, { data: item });
  }

  deleteItem(item: any): void {
    // Implement your delete logic here
  }
}
