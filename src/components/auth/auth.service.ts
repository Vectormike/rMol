import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import env from '../../helpers/env';
import { BadRequestError, UnauthorizedError, NotFoundError } from '../../errors';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { UserType } from '../user/user.type';
import { ChangePasswordInput, CreateUserAccountInput, LoginInput } from './auth.input';
import { LoggedInType } from './auth.type';
import { UserShape } from '../user/user.model';
import logger from '../../logger';
import { redisClient } from '../../redis.connection';

export class AuthService {
  frontendBaseUrl: string = env.getBackendUrl();
  JWT_AUTH_SECRET: string = env.get('JWT_AUTH_SECRET');
  REFRESH_TOKEN_SECRET: string = env.get('REFRESH_TOKEN_SECRET');
  private BCRYPT_SALT: number = parseInt(env.get('BCRYPT_SALT'));

  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  /**
   * Generates JWT for a user
   * @param data - An object containing the ID and email of a user
   * @returns { string } - JWT
   */
  private generateJWT(user: UserShape): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      date: Date.now(),
    };
    return jwt.sign(payload, this.JWT_AUTH_SECRET, { expiresIn: '1d' });
  }

  /**
   * generate new refresh token
   */
  async generateNewRefreshToken(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET, (err, payload) => {
        logger.info('invalid refresh token');
        if (err) return reject(new UnauthorizedError('invalid refresh token'));

        redisClient.GET(`refreshToken:${payload.id}:${refreshToken}`, async (err, result) => {
          logger.info('Internal Server Error');
          if (err) {
            reject(Error('Internal Server Error'));
          }

          if (refreshToken === result) {
            var newRefreshToken = await this.generateRefreshToken(payload);

            var token = this.generateJWT(payload);
            return resolve({ refreshToken: newRefreshToken, token });
          } else {
            logger.info('Invalid Refresh token');
            reject(new UnauthorizedError('Invalid Refresh token'));
          }
        });
      });
    });
  }

  /**
   * Generates JWT for a user
   * @param data - An object containing the ID and email of a user
   * @returns { string } - JWT
   */
  private generateRefreshToken(user: UserShape): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      date: Date.now(),
    };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn: '90d' }, (err, token) => {
        console.log(payload);
        if (err) {
          reject(new Error('Internal Server Error'));
        }
        resolve(token);
      });
    });
  }

  /**
   * Composes the login data
   */
  private composeLoginData(user: UserShape, token: string, refreshToken: string): LoggedInType {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token,
      refreshToken,
    };
  }

  /**
   * Creates a new user account
   */
  async register(data: CreateUserAccountInput): Promise<UserType> {
    try {
      const user = await this.userService.createUser({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        role: data.role,
      });

      return {
        email: user.email,
      };
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Logs a user in
   */
  async login(data: LoginInput): Promise<LoggedInType> {
    const genericMessage = 'Invalid email or password';
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      logger.info(genericMessage);
      throw new UnauthorizedError(genericMessage);
    }

    if (!user.password) {
      logger.info(genericMessage);
      throw new UnauthorizedError(genericMessage);
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      logger.info(genericMessage);
      throw new UnauthorizedError(genericMessage);
    }

    const jwt = this.generateJWT(user);

    const refreshToken = await this.generateRefreshToken(user);

    return this.composeLoginData(user, jwt, refreshToken);
  }

  /**
   * Changes the password of a user
   */
  async changePassword(data: ChangePasswordInput): Promise<void> {
    if (data.newPassword !== data.confirmPassword) {
      logger.info('Passwords do not match');
      throw new BadRequestError('Passwords do not match');
    }

    const user = await this.userService.findById(data.userId);

    if (!user) {
      logger.info('Account not found');
      throw new NotFoundError('Account not found');
    }

    const match = await bcrypt.compare(data.currentPassword, user.password);

    if (!match) {
      logger.info('Current password is incorrect');
      throw new BadRequestError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, this.BCRYPT_SALT);

    await this.userService.update(user.id, { password: hashedPassword });
  }

  /**g
   * Logouts a user's client out of the application by deleting their refresh token if one exists
   */
  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      logger.info('Provide a refresh token');
      throw new Error('Provide a refresh token');
    }
    // const { id }: any = await verifyRefreshToken(refreshToken);

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          logger.info('Invalid refresh token');
          return reject(new UnauthorizedError('Invalid refresh token'));
        }

        redisClient.DEL(`refreshToken:${payload.id}:${refreshToken}`, async (err, result) => {
          if (err) {
            logger.info('Invalid refresh token');
            reject(Error('Invalid refresh token'));
          }
          resolve();
        });
      });
    });
  }
}
