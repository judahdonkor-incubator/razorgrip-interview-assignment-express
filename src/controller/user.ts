import { BlockUser } from '../model'
import { getRepository } from "typeorm";

export class User {
    async blockUser(data: BlockUser): Promise<void> {
        getRepository(BlockUser).save(data)
    }
}