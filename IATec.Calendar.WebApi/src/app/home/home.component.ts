import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/eventmodel';
import { DataService } from '../dataservice';
import { AuthService } from '../login/AuthService';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '../toast.service';
import { ProgressBarService } from '../progressbar.service';
import { InviteModel } from '../models/invitemodel';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

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
    private toastService: ToastService,
    public dialog: MatDialog) {
    this.obterDataAtual()
  }

  eventsDataSource: MatTableDataSource<EventModel> = new MatTableDataSource();
  eventsDisplayedColumns: string[] = ['eventDate', 'name', 'description', 'localization', 'status', 'actions'];
  eventsResultsLength = 0;

  invitationsDataSource: MatTableDataSource<InviteModel> = new MatTableDataSource();
  invitationsDisplayedColumns: string[] = ['hostName', 'eventName', 'startDate', 'endDate', 'localization', 'participantNames', 'actions'];
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

    this.dataService.getListInvitesData(localStorage.getItem('UserId') ?? '')
      .subscribe({
        next: (response) => {
          this.invitationsDataSource.data = response;
          this.invitationsResultsLength = response.length;
        },
        error: (error) => {
          console.log(error.message);

          if (error.status === 404) {
            this.toastService.warning("Não há convites para hoje!");
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

  inviteAction(eventId: string, acept: boolean) {
    if (acept) {
      this.dataService.aceptInvite();
    } else {
      this.dataService.rejectInvite();
    }
  }
}
