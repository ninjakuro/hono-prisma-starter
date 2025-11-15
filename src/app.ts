import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { userController } from '@/modules/users/user.controller';

const app = new Hono();
app.use(logger());

app.route('/users', userController);

export default app;
