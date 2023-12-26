import { Component } from '@angular/core';
import { EventModel } from '../../models/eventmodel';
import { DataService } from '../../app-data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../app-toast.service';

@Component({
  selector: 'app-updateevents',
  templateUrl: './update.events.component.html',
  styleUrl: './update.events.component.scss'
})
export class UpdateEventsComponent {
  eventModel!: EventModel;
  eventId: string | null = null;

  constructor(private dataService: DataService, private route: ActivatedRoute, private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
    });

    if (this.eventId !== null)
      this.dataService.getEventById(this.eventId).subscribe({
        next: (response) => {
          console.log(response);
          this.eventModel = response;
        },
        error: (error) => {
          console.log(error.message);

          if (error.status === 404) {
            this.toastService.warning("Nada foi encontrado!");
          } else {
            this.toastService.warning("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          }
        }
      });
  }
}
