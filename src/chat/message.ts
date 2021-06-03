import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    senderId!: string;
    @Column()
    recipientId!: string;
    @Column()
    message!: string;
}