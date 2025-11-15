import { Hono } from 'hono';
import { validator } from 'hono/validator'
import { HTTPException } from 'hono/http-exception';
import { UserService } from './user.service';

export const userController = (userService: UserService) => {
	const app = new Hono();

	app.get('/', async c => {
		const users = await userService.findAll();
		return c.json(users);
	});

	app.get('/:id', async c => {
		const id = c.req.param('id');
		const user = await userService.findById(Number(id));
		return c.json(user);
	});

	app.post('/',
		validator('json', ({ email, password }) => {
			if (!email || !password) {
				throw new HTTPException(400, { message: 'email and password are required' });
			}
			return { email, password };
		}),
		async c => {
			const body = c.req.valid('json');
			const user = await userService.create(body);
			return c.json(user, 201);
		}
	);

	return app;
}
