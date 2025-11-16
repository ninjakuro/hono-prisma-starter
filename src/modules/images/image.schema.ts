import { z } from 'zod';

export const createImageSchema = z.object({
	ownerType: z.string(),
	ownerId: z.number(),
	type: z.string().optional(),
});

export type CreateImageInput = z.infer<typeof createImageSchema>;
