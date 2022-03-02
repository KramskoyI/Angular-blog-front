export interface User {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface UserLog {
    id?: number
    email: string
    password: string
    returnSecureToken: boolean
}

export interface authResponse {
    id?: number
    firstName: string
    lastName: string
    accessToken: string
}

export interface Post {
    id?: number
    title: string
    content: string
    image: string
}


