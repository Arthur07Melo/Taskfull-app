


declare namespace Express {
    export interface Request {
        user: Partial<{
            id: string,
            email: string,
            username: string,
            password: string
        }>
    }
}
