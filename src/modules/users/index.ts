import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { userController } from './user.controller';

const userRepository = new UserRepository();
export const userService = new UserService(userRepository);
export const userRouter = userController(userService);
