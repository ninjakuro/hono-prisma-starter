import { Hono } from 'hono';
import { db } from '@/db';
import { User } from '@prisma/client';
import { UserService } from '@/modules/users/user.service';
import { HTTPException } from 'hono/http-exception';

const userService = new UserService();

export const userController = new Hono();

userController.onError((error, c) => {
	if (error instanceof HTTPException) {
		return c.json(error.message, error.status);
	}

	return c.text(error.message, 400);
});

userController.get('/', async c => {
	const users = await userService.findAll();
	return c.json(users);
});

userController.post('/', async c => {
	const body = await c.req.json<Partial<Omit<User, 'id'>>>();
	const user = await userService.create(body);
	return c.json(user, 201);
});
