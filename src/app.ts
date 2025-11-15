import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import { UserService } from '@/modules/users/user.service';
import { userController } from '@/modules/users/user.controller';

const app = new Hono();
app.use(logger());

const userService = new UserService();
app.route('/users', userController(userService));

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}
	return c.json({ error: 'Internal server error' }, 500);
});

export default app;
