import { Component } from '@angular/core';
import { EventModel } from '../../models/eventmodel';
import { DataService } from '../../DataService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateevents',
  templateUrl: './update.events.component.html',
  styleUrl: './update.events.component.scss'
})
export class UpdateEventsComponent {
  eventModel!: EventModel;
  create = false;
  eventId: string | null = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {

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
        error: (erro) => {
          console.log(erro.message);

          if (erro.status === 404) {
            alert("Nada foi encontrado!");
          } else {
            alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          }
        }
      });
  }
}
