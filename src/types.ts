export type Service = {
    id:string,
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

export type User = {
    id: string
    login?: string,
    password?: string
}

export type Order = {
    id: string,
    date: string,
    time: string,
    user: string,
    client: Client,
    service: Service
}
