import crypto from 'node:crypto';
import { rgbaToThumbHash } from 'thumbhash';
import sharp, { type Sharp } from 'sharp';
import { uploadFile } from '@/modules/storage/storage.utils';

export async function uploadImage(filepath: string, arrayBuffer: ArrayBuffer) {
	return uploadFile('images', filepath, arrayBuffer);
}

export async function getImageData(arrayBuffer: ArrayBuffer) {
	const image = sharp(arrayBuffer);
	const meta = await image.metadata();
	const thumbhash = await createThumbHash(image);
	const format = getFormat(meta.format);

	return {
		width: meta.width,
		height: meta.height,
		thumbhash,
		format,
	}
}

function getFormat(format: string) {
	if (format === 'jpeg') return 'jpg';
	return format;
}

export function createFilename(ownerId: number, format: string) {
	const uniqId = crypto.randomBytes(8).toString('hex');
	return `${ownerId}_${uniqId}.${format}`;
}

async function createThumbHash(image: Sharp) {
	const { data, info } = await image.clone().resize(100, 100, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const binaryThumbHash = rgbaToThumbHash(info.width, info.height, data);
	return Buffer.from(binaryThumbHash).toString('base64');
}

