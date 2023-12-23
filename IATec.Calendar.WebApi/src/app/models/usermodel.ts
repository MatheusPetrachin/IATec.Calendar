export class UserModel {
    email!: string;
    password!: string;
    name!: string;
    token!: string

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
