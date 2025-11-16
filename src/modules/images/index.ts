import { ImageService } from '@/modules/images/image.service';
import { ImageRepository } from '@/modules/images/image.repository';
import { imageController } from '@/modules/images/image.controller';

const imageRepository = new ImageRepository();
export const imageService = new ImageService(imageRepository);
export const imageRouter = imageController(imageService);
