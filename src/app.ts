import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import { userRouter } from '@/modules/users';

const app = new Hono();
app.use(logger());

app.route('/users', userRouter);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}
	return c.json({ error: 'Internal server error' }, 500);
});

export default app;
