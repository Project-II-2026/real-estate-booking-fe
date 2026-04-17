export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    firstName: string
    lastName: string
    phoneNumber: string
    username: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface RegisterResponse {
    username: string
    email: string
    role: string
}