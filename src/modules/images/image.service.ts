import { HTTPException } from 'hono/http-exception';
import { ImageRepository } from './image.repository';
import { CreateImageInput } from './image.schema';
import { createFilename, getImageData, uploadImage } from './image.utils';

export class ImageService {
	constructor(private repo: ImageRepository) {}

	private async create(arrayBuffer: ArrayBuffer, params: CreateImageInput) {
		const data = await getImageData(arrayBuffer);

		if (!data.format || !['jpg', 'png'].includes(data.format)) {
			throw new HTTPException(400, { message: 'Unsupported image format' });
		}

		if (!data.width || !data.height) {
			throw new HTTPException(400, { message: 'Bad image' });
		}

		const filename = createFilename(params.ownerId, data.format);

		const image = await this.repo.create({
			ownerType: params.ownerType,
			ownerId: params.ownerId,
			type: params.type,
			width: data.width,
			height: data.height,
			thumbhash: data.thumbhash,
			filename,
		});

		await uploadImage(filename, arrayBuffer);

		return image;
	}

	async findByOwner(ownerType: string, ownerId: number) {
		return this.repo.findByOwner(ownerType, ownerId);
	}
}
