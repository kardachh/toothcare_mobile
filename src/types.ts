export type Service = {
    id?:string,
    name: string,
    description: string,
    price: number
}

export type Client = {
    id?:string,
    phone: string,
    FirstName: string,
    LastName: string,
    SecondName: string
}

export enum UserTypes {
    "admin" = "admin",
    "employee" = "employee"
}

export type User = {
    id: string
    login?: string,
    password?: string,
    FirstName?: string,
    LastName?: string,
    SecondName?: string,
    type?: UserTypes,
}

export type Order = {
    id?: string,
    date: string,
    time: string,
    user: User,
    client: Client,
    service: Service
}
