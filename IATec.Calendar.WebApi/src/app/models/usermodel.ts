export class UserModel {
    id!: string;
    email!: string;
    password!: string;
    name!: string;
    token!: string

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
