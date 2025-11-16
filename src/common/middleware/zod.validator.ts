import { ZodType } from 'zod'
import type { ValidationTargets } from 'hono'
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator'

export const zv = <T extends ZodType, Target extends keyof ValidationTargets>(
	target: Target,
	schema: T
) => {
	return zValidator(target, schema, (result) => {
		if (!result.success) {
			throw new HTTPException(400, result.error);
		}
	});
}
