import { Hono } from 'hono';
import { UserService } from './user.service';
import { createUserSchema, getUserSchema } from './user.schema';
import { zv } from '@/common/middleware/zod.validator';

export const userController = (userService: UserService) => {
	const app = new Hono();

	app.get('/', async c => {
		const users = await userService.findAll();
		return c.json(users);
	});

	app.get('/:id', zv('param', getUserSchema), async c => {
		const { id } = c.req.valid('param');
		const user = await userService.findById(id);

		if (!user) return c.notFound();
		return c.json(user);
	});

	app.post('/', zv('json', createUserSchema), async c => {
		const body = c.req.valid('json');
		const user = await userService.create(body);
		return c.json(user, 201);
	});

	return app;
}
