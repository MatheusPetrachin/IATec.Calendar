import { UserModel } from "./usermodel";

export class EventModel {
    public eventDate!: Date;
    public name!: string;
    public location!: string;
    public participants!: UserModel[]
}
