import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BlockUser {
    @PrimaryColumn()
    senderId!: string;
    @PrimaryColumn()
    recipientId!: string;
}