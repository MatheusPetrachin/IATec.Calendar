import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../app-data.service';
import { UserModel } from '../models/usermodel';
import { EventModel } from '../models/eventmodel';
import { ProgressBarService } from '../app-progress.bar.service';

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
  @Input() create: boolean = false;
  @Input() onlyview: boolean = false;
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
  title!: string;
  readonly!: boolean;
  disableSelect = new FormControl(false);

  constructor(private router: Router, private dataService: DataService, private progressBarService: ProgressBarService) {
    this.getHours();
    this.getMinutes();
    this.getParticipants();
  }

  ngOnInit() {
    if (this.onlyview) {
      this.title = 'Visualizar'
      this.readonly = true;
    }
    else if (this.create) {
      this.title = 'Cadastrar'
      this.readonly = false;
    }
    else {
      this.title = 'Atualizar'
      this.readonly = false;
    }

    this.form = new FormGroup({
      id: new FormControl(this.eventModel ? this.eventModel.id : null),
      name: new FormControl({ value: this.eventModel ? this.eventModel.name : '', disabled: this.readonly }, [Validators.required]),
      description: new FormControl({ value: this.eventModel ? this.eventModel.description : '', disabled: this.readonly }, Validators.required),
      startDate: new FormControl({ value: this.eventModel ? this.removeTimeFromDate(new Date(this.eventModel.startDate)) : this.removeTimeFromDate(new Date()), disabled: this.readonly }, Validators.required),
      endDate: new FormControl({ value: this.eventModel ? this.removeTimeFromDate(new Date(this.eventModel.endDate)) : this.removeTimeFromDate(new Date()), disabled: this.readonly }, Validators.required),
      localization: new FormControl({ value: this.eventModel ? this.eventModel.localization : '', disabled: this.readonly }, Validators.required),
      startHour: new FormControl({ value: this.eventModel ? this.eventModel.startHour : 0, disabled: this.readonly }, Validators.required),
      startMinute: new FormControl({ value: this.eventModel ? this.eventModel.startMinute : 0, disabled: this.readonly }, Validators.required),
      endHour: new FormControl({ value: this.eventModel ? this.eventModel.endHour : 0, disabled: this.readonly }, Validators.required),
      endMinute: new FormControl({ value: this.eventModel ? this.eventModel.endMinute : 0, disabled: this.readonly }, Validators.required),
      participantIds: new FormControl({ value: this.eventModel ? this.eventModel.participantIds : [], disabled: this.readonly })
    });
  }

  private removeTimeFromDate(inputDate: Date | null): Date | null {
    if (inputDate === null) {
      return null;
    }
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const day = inputDate.getDate();
    return new Date(year, month, day);
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
      error: (error) => {
        console.log(error.message);
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
    var event = this.form.value as EventModel;

    this.form.get('endDate')?.setErrors(null);
    this.form.get('endHour')?.setErrors(null);
    this.form.get('endMinute')?.setErrors(null);

    console.log(event);

    const endDate = new Date(event.endDate.getFullYear(), event.endDate.getMonth(), event.endDate.getDate(), 0, 0, 0, 0);
    const startDate = new Date(event.startDate.getFullYear(), event.startDate.getMonth(), event.startDate.getDate(), 0, 0, 0, 0);

    if (endDate.getTime() === startDate.getTime()) {
      if (event.endHour === event.startHour) {
        if (event.endMinute <= event.startMinute) {
          this.form.get('endDate')?.setErrors({ 'InvalidEventEndDateTime': true });
          this.form.get('endHour')?.setErrors({ 'InvalidEventEndDateTime': true });
          this.form.get('endMinute')?.setErrors({ 'InvalidEventEndDateTime': true });
        }
      } else if (event.endHour < event.startHour) {
        this.form.get('endDate')?.setErrors({ 'InvalidEventEndDateTime': true });
        this.form.get('endHour')?.setErrors({ 'InvalidEventEndDateTime': true });
        this.form.get('endMinute')?.setErrors({ 'InvalidEventEndDateTime': true });
      }
    } else if (endDate < startDate) {
      this.form.get('endDate')?.setErrors({ 'InvalidEventEndDateTime': true });
      this.form.get('endHour')?.setErrors({ 'InvalidEventEndDateTime': true });
      this.form.get('endMinute')?.setErrors({ 'InvalidEventEndDateTime': true });

    }

    if (this.form.valid) {
      this.progressBarService.showLoad(true);

      if (this.create)
        this.dataService.createEvent(event);
      else
        this.dataService.updateEvent(event);

    }
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }
}
