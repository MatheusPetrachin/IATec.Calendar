import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from '../models/eventmodel';
import { DataService } from '../DataService';
import { AuthService } from '../login/AuthService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private dataService: DataService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.obterDataAtual()
  }

  dataSource: MatTableDataSource<EventModel> = new MatTableDataSource();
  displayedColumns: string[] = ['eventDate', 'name', 'description', 'localization', 'status', 'actions'];
  resultsLength = 0;

  date: Date = new Date();

  ngOnInit() {
    this.authService.showToolbarEmitter.emit(true);

    this.dataService.reloadTable.subscribe(
      reload => {
        if (reload) {
          this.loadData(this.date)
        }
      }
    );

    this.loadData(this.date)
  }

  redirect(page: string, id: string | null) {
    if (id === null)
      this.router.navigate(['/' + page]);
    else
      this.router.navigate(['/events/edit', id]);
  }

  obterDataAtual() {
    this.date = new Date();
  }

  loadData(date: Date): void {
    this.dataService.getListEventData(localStorage.getItem('UserId') ?? '', date)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.resultsLength = response.length;
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

  deleteItem(id: string): void {
    if (id !== null)
      this.dataService.deleteEvent(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
