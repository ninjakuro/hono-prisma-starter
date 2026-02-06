import { db } from '@/db';
import { UserCreateInput } from '@/db/prisma/models/User';

export class UserRepository {
	async create(data: UserCreateInput) {
		return db.user.create({
			data: {
				email: data.email,
				passhash: data.passhash,
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
