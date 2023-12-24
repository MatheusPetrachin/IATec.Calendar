import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../DataService';
import { UserModel } from '../models/usermodel';

interface selectModel {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  constructor(private router: Router, private dataService: DataService) {
    this.getHours();
    this.getMinutes();
    this.loadToppings();
  }

  toppings = new FormControl('');

  toppingList!: UserModel[];
  hours: selectModel[] = [];
  minutes: selectModel[] = [];

  private getHours(): void {
    for (let i = 0; i <= 23; i++) {
      this.hours.push({ value: i, viewValue: i.toString() });
    }
  }

  private getMinutes(): void {
    for (let i = 0; i < 60; i += 5) {
      this.minutes.push({ value: i, viewValue: i.toString() });
    }
  }

  private loadToppings(): void {
    this.dataService.SelectUsers().subscribe({
      next: (response) => {
        this.toppingList = response;
      },
      error: (erro) => {
        console.log(erro.message);
      }
    });
  }


  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }
}
