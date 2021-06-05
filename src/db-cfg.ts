import { ConnectionOptions } from "typeorm";
import { BlockedUser, Online } from './user'
import { Message } from './chat'

export const cfg: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "razorgrip",
    password: process.env.POSTGRES_PASSWORD || "razorgrip",
    database: process.env.POSTGRES_DB || "razorgrip",
    entities: [Message, BlockedUser, Online],
    synchronize: true,
}