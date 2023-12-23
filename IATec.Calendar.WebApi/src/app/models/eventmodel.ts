import { UserModel } from "./usermodel";

export class EventModel {
    public date!: Date;
    public eventName!: string;
    public location!: string;
    public participants!: UserModel[]
}
