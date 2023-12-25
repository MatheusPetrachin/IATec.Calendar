import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/eventmodel';
import { DataService } from '../DataService';
import { AuthService } from '../login/AuthService';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '../toast.service';
import { ProgressBarService } from '../progressbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private progressBarService: ProgressBarService,
    private toastService: ToastService) {
    this.obterDataAtual()
  }

  eventsDataSource: MatTableDataSource<EventModel> = new MatTableDataSource();
  eventsDisplayedColumns: string[] = ['eventDate', 'name', 'description', 'localization', 'status', 'actions'];
  eventsResultsLength = 0;

  invitationsDataSource: MatTableDataSource<EventModel> = new MatTableDataSource();
  invitationsDisplayedColumns: string[] = ['eventDate', 'name', 'description', 'localization', 'status', 'actions'];
  invitationsResultsLength = 0;

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
          this.eventsDataSource.data = response;
          this.eventsResultsLength = response.length;
        },
        error: (error) => {
          console.log(error.message);

          if (error.status === 404) {
            this.toastService.warning("Não há eventos para hoje!");
          } else {
            this.toastService.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          }
        }
      });
  }

  deleteItem(id: string): void {
    if (id !== null) {
      this.progressBarService.showLoad(true);
      this.dataService.deleteEvent(id);
    }
  }

  applyFilter(event: Event, eventsTable: boolean) {
    if (eventsTable) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.eventsDataSource.filter = filterValue.trim().toLowerCase();

      if (this.eventsDataSource.paginator) {
        this.eventsDataSource.paginator.firstPage();
      }
    }
    else {

    }
  }
}
