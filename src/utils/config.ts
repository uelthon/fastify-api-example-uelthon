import * as dotenv from 'dotenv'
dotenv.config()

export const POSTGRES_URI = process.env.POSTGRES_URI
export const PORT = Number(process.env.PORT) ?? '3001'
