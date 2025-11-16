import { db } from '@/db';
import { Prisma } from '@prisma/client';

export type ImageInsert = Prisma.ImageCreateInput;

export class ImageRepository {
	async create(data: ImageInsert) {
		return db.image.create({
			data: {
				width: data.width,
				height: data.height,
				ownerType: data.ownerType,
				ownerId: data.ownerId,
				filename: data.filename,
				thumbhash: data.thumbhash,
				type: data.type,
			},
		});
	}

	async findByOwner(ownerType: string, ownerId: number) {
		return db.image.findMany({ where: { ownerType, ownerId } });
	}
}
