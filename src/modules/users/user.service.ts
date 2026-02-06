import { HTTPException } from 'hono/http-exception';
import { type UserRepository } from './user.repository';
import { UserCreateInput } from '@/db/prisma/models/User';

export class UserService {
	constructor(private repo: UserRepository) {}

	async create(data: UserCreateInput) {
		const isExists = await this.findByEmail(data.email);

		if (isExists) {
			throw new HTTPException(409, { message: 'User already exists' });
		}

		return this.repo.create({
			email: data.email,
			passhash: data.passhash,
		});
	}

	async findById(id: number) {
		return this.repo.findById(id);
	}

	async findByEmail(email: string) {
		return this.repo.findByEmail(email);
	}

	async findAll() {
		return this.repo.findAll();
	}
}
