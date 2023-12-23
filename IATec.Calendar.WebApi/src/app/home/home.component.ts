import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EventModel } from '../models/eventmodel';
import { DataService } from '../DataService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router, private dataService: DataService) {
    this.obterDataAtual()
  }

  dataSource: EventModel[] = [];
  displayedColumns: string[] = ['eventDate', 'name'];

  date: Date = new Date();

  ngOnInit() {
    this.loadData(this.date)
  }


  obterDataAtual() {
    this.date = new Date();
  }

  loadData(date: Date): void {
    this.dataService.getListEventData('ec524a4b-c201-44b4-8dd1-ad03e29a3ee6', this.date)
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          console.log("Resposnse: ")
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



}
