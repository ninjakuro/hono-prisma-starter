import { HTTPException } from 'hono/http-exception';
import { User } from '@prisma/client';
import { UserRepository } from '@/modules/users/user.repository';

const userRepository = new UserRepository();

export class UserService {
	async create(data: Partial<Omit<User, 'id'>>) {
		if (!data.email || !data.password) {
			throw new HTTPException(400, { message: 'email and password are required' });
		}

		const isExists = await userRepository.findByEmail(data.email);

		if (isExists) {
			throw new HTTPException(409, { message: 'User already exists' });
		}

		return userRepository.create({
			email: data.email,
			password: data.password,
		});
	}

	async findAll() {
		return userRepository.findAll();
	}
}
