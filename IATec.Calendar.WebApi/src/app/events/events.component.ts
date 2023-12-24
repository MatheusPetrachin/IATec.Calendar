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
  @Input() action: boolean = false;
  @Input() eventModel: EventModel | null = null;

  form!: FormGroup;
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

    console.log(this.eventModel);

    this.form = new FormGroup({
      id: new FormControl(this.eventModel ? this.eventModel.id : null),
      name: new FormControl(this.eventModel ? this.eventModel.name : '', [Validators.required]),
      description: new FormControl(this.eventModel ? this.eventModel.description : '', Validators.required),
      startDate: new FormControl(this.eventModel ? this.eventModel.startDate : '', Validators.required),
      endDate: new FormControl(this.eventModel ? this.eventModel.endDate : '', Validators.required),
      localization: new FormControl(this.eventModel ? this.eventModel.localization : '', Validators.required),
      startHour: new FormControl(this.eventModel ? this.eventModel.startHour : '', Validators.required),
      startMinute: new FormControl(this.eventModel ? this.eventModel.startMinute : '', Validators.required),
      endHour: new FormControl(this.eventModel ? this.eventModel.endHour : '', Validators.required),
      endMinute: new FormControl(this.eventModel ? this.eventModel.endMinute : '', Validators.required),
      participantIds: new FormControl(this.eventModel ? this.eventModel.participantIds : '', Validators.required)
    });

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
    this.dataService.selectUsers().subscribe({
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

  submit(isEdit: boolean) {
    var event = this.form.value as EventModel;

    if (this.form.valid) {
      this.dataService.loadingFormsEventEmitter.emit(true);

      if (isEdit)
        this.dataService.updateEvent(event);
      else
        this.dataService.createEvent(event);
    }
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }
}
