export class EventModel {
    public name!: string;
    public description!: string;
    public startDate!: Date;
    public endDate!: Date;
    public localization!: string;
    public startHour!: number;
    public startMinute!: number;
    public endHour!: number;
    public endMinute!: number;
    public participants!: string[]
}
