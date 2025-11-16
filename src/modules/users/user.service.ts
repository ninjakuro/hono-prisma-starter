import { HTTPException } from 'hono/http-exception';
import { type UserInsert, type UserRepository } from './user.repository';

export class UserService {
	constructor(private repo: UserRepository) {}

	async create(data: UserInsert) {
		const isExists = await this.findByEmail(data.email);

		if (isExists) {
			throw new HTTPException(409, { message: 'User already exists' });
		}

		return this.repo.create({
			email: data.email,
			password: data.password,
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
