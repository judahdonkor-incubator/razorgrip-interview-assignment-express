import { BlockUser, Message } from '../model'
import { getRepository, Repository } from "typeorm";

export class Chat {
    private repos: Repository<Message>
    constructor() { this.repos = getRepository(Message) }
    async getChat(params: Pick<Message, 'recipientId' | 'senderId'>): Promise<Message[]> {
        return this.repos
            .createQueryBuilder('m')
            .where('m.recipientId = :recipientId and m.senderId = :senderId', params)
            .getMany()
    }
    async sendMessage(message: Omit<Message, 'id'>): Promise<void> {
        this.repos.save(message)
    }
}