import { Hono } from 'hono';
import { type ImageService } from './image.service';

export const imageController = (imageService: ImageService) => {
	const app = new Hono();

	return app;
}
