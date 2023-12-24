import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../DataService';
import { UserModel } from '../models/usermodel';
import { EventModel } from '../models/eventmodel';

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
  @Input() action: string = "";

  form: FormGroup;
  toppings = new FormControl('');
  toppingList!: UserModel[];
  selectedParticipants!: string[];
  hours: selectModel[] = [];
  minutes: selectModel[] = [];
  startHour!: number;
  startMinute!: number;
  endHour!: number;
  endMinute!: number;
  loading: boolean | null = false;

  constructor(private router: Router, private dataService: DataService, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      startDate: [Date, Validators.required],
      endDate: [Date, Validators.required],
      localization: ['', Validators.required],
      startHour: [this.startHour, Validators.required],
      startMinute: [this.startMinute, Validators.required],
      endHour: [this.endHour, Validators.required],
      endMinute: [this.endMinute, Validators.required],
      participants: [this.selectedParticipants, Validators.required]
    })

    this.getHours();
    this.getMinutes();
    this.getParticipants();
  }

  ngOnInit() {
    this.dataService.loadingFormsEventEmitter.subscribe(
      show => {
        this.loading = show
      }
    );
  }

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

  private getParticipants(): void {
    this.dataService.SelectUsers().subscribe({
      next: (response) => {
        this.toppingList = response;
      },
      error: (erro) => {
        console.log(erro.message);
      }
    });
  }

  selectHour(typeHour: string, hour: number) {
    if (typeHour === 'start')
      this.startHour = hour;
    else
      this.endHour = hour
  }

  selectMinute(typeMinute: string, minute: number) {
    if (typeMinute === 'start')
      this.startMinute = minute;
    else
      this.endMinute = minute
  }

  selectParticipants(participants: string[]) {
    this.selectedParticipants = participants
  }

  submit() {
    this.dataService.loadingFormsEventEmitter.emit(true);
    var event = this.form.value as EventModel;

    if (this.form.valid) {
      this.dataService.CreateEvent(event);
    }
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }
}
