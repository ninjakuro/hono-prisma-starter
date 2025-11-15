import { db } from '@/db';
import { User } from '@prisma/client';

export class UserRepository {
	async create(data: Omit<User, 'id'>) {
		return db.user.create({
			data: {
				email: data.email,
				password: data.password,
			},
		});
	}

	async findAll() {
		return db.user.findMany();
	}

	async findByEmail(email: string) {
		return db.user.findUnique({ where: { email } });
	}
}
