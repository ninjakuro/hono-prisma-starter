import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

function getRelativeDir(filename: string) {
	const secret = `${filename}${process.env.SECRET}`;
	const hash = crypto.createHash('md5').update(secret).digest('hex');
	const depth = 2;
	const dirs: string[] = [];

	for(let i = 0; i <= depth; i++) {
		dirs.push(hash.substring(i * depth, depth));
	}

	return path.join(...dirs);
}

export function getFilePath(storagePath: string, filename: string) {
	return path.join(storagePath, getRelativeDir(filename), filename);
}

export async function downloadFile(url: string) {
	const response = await fetch(url);
	return response.arrayBuffer();
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

export async function writeFile(filepath: string, data: string | Buffer) {
	const dir = path.dirname(filepath);
	await createDirectoryIfNotExists(dir);
	await fs.writeFile(filepath, data);
}

export async function deleteFile(filepath: string) {
	await fs.unlink(filepath);
}
