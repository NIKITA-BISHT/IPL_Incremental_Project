export class User {
    userId: number;
    fullName: string;
    username: string;
    password: string;
    email: string;
    role: string;

    constructor(
        userId: number,
        fullName: string,
        username: string,
        password: string,
        email: string,
        role: string
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    displayInfo(): void {
        console.log(`User ID: ${this.userId}, 
            Full Name: ${this.fullName}, 
            Email: ${this.email}`);
    }
}