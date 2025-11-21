import crypto from 'node:crypto';
import sharp from 'sharp';
import { HTTPException } from 'hono/http-exception';
import { ImageRepository } from './image.repository';
import { type CreateImageInput } from '@/modules/images/image.schema';
import { deleteFile, getFilePath, writeFile } from '@/common/utils/storage';

export class ImageService {
	constructor(private repo: ImageRepository) {}

	async uploadFile(arrayBuffer: ArrayBuffer, data: CreateImageInput) {
		const image = sharp(arrayBuffer);
		const meta = await image.metadata();
		const format = meta.format === 'jpeg' ? 'jpg' : meta.format;

		if (!meta.format || !['jpg', 'png'].includes(format)) {
			throw new HTTPException(400, { message: 'Unsupported image format: ' + format });
		}

		if (!meta.width || !meta.height) {
			throw new HTTPException(400, { message: 'Bad image' });
		}

		const buffer = Buffer.from(arrayBuffer);
		const uniqId = crypto.randomBytes(6).toString('hex');

		const filename = `${data.ownerType}-${data.ownerId}-${uniqId}.${format}`;
		const filepath = getFilePath('storage/images', filename);

		await writeFile(filepath, buffer);

		try {
			return this.repo.create({
				ownerType: data.ownerType,
				ownerId: data.ownerId,
				type: data.type,
				width: meta.width,
				height: meta.height,
				filename,
			});
		} catch (error) {
			await deleteFile(filepath);
		}
	}

	async findByOwner(ownerType: string, ownerId: number) {
		return this.repo.findByOwner(ownerType, ownerId);
	}
}
