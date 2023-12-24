import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

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

  constructor(private router: Router, private dataService: DataService) {
    this.getHours();
    this.getMinutes();

    //pegar usaurios para popular select
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }
}

interface selectModel {
  value: number;
  viewValue: string;
}
