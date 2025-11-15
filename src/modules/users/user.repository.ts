import { db } from '@/db';
import { Prisma } from '@prisma/client';

export type UserInsert = Prisma.UserCreateInput;

export class UserRepository {
	async create(data: UserInsert) {
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

	async findById(id: number) {
		return db.user.findUnique({ where: { id } });
	}
}
