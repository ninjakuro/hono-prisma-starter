import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

export async function uploadFile(type: string, filename: string, arrayBuffer: ArrayBuffer) {
	// @TODO storage path from config
	const dir = path.join('storage', type, getRelativeDir(filename));
	const filepath = path.join(dir, filename);
	await createDirectoryIfNotExists(dir);
	await fs.writeFile(filepath, Buffer.from(arrayBuffer));
	return filepath;
}

function getRelativeDir(filename: string) {
	const hash = crypto.createHash('md5').update(`${filename}${process.env.SECRET}`).digest('hex');
	const depth = 2;
	const dirs: string[] = [];

	for(let i = 0; i <= depth; i++) {
		dirs.push(hash.substring(i * depth, depth));
	}

	return path.join(...dirs);
}

async function createDirectoryIfNotExists(dir: string) {
	try {
		await fs.access(dir);
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
			await fs.mkdir(dir, { recursive: true });
		}
	}
}

export async function downloadFile(url: string) {
	const response = await fetch(url);
	return response.arrayBuffer();
}
