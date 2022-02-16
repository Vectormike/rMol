import { Router } from 'express';
import { IAuthController } from './auth.controller';
import { ComponentRouterOptions } from '../../shared/types/ComponentRouterOptions';
import { AuthValidator } from './auth.dto';

export function AuthRouter(options: ComponentRouterOptions<IAuthController, AuthValidator>): Router {
  const { controller, guards, validator } = options;

  const router = Router();

  /**
   * @register - register a user
   */
  router.post('/register', validator.CreateAccountDto.validate, controller.register);

  /**
   * @login - sign in a user
   */
  router.post('/login', validator.LoginDto.validate, controller.login);

  /**
   * @logout
   */
  router.post('/logout', validator.RefreshTokenDto.validate, controller.logout);

  /**
   * @generateRefreshTohen
   */
  router.post('/refresh-token', validator.RefreshTokenDto.validate, controller.generateToken);

  return router;
}
