import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors';
import * as randomstring from 'randomstring';
import env from '../../helpers/env';
import { UserShape, User } from './user.model';
import { CreateUserInput } from './user.input';
import { UserType, PreUserCreationProcessOutput } from './user.type';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';

export class UserService {
  private BCRYPT_SALT: number = parseInt(env.get('BCRYPT_SALT'));

  constructor(private readonly userModel = User) {}

  /**
   * Takes in a `UserType` object and filters it to return a `UserProfileType` object. The purpose of this
   * helper method is to protect sensitive user information
   * @param { UserType } user - User data
   * @returns { UserProfileType }
   */
  private obtainProfile(user: UserType): UserType {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };
  }

  /**
   * Hashes a password and returns the hash
   * @param { string } password - A regular raw readable string
   * @returns a hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.BCRYPT_SALT);
  }

  /**
   * Runs a set of necessary operations before a user account is created
   * @param { createUserInput } createUserInput - An object containing the data required for creating a new user
   */
  async runPreUserCreationProcesses(createUserInput: CreateUserInput): Promise<PreUserCreationProcessOutput> {
    const hashedPassword = await this.hashPassword(createUserInput.password);
    return {
      hashedPassword,
    };
  }

  /**
   * Creates a new user document
   * @param { createUserInput } createUserInput - An object containing the data required for creating a new user
   */
  async createUser(createUserInput: CreateUserInput): Promise<UserShape> {
    const { hashedPassword } = await this.runPreUserCreationProcesses(createUserInput);
    return await this.userModel.query().insert({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  /**
   * Finds a user by username
   */
  async findByEmail(email: string): Promise<UserShape> {
    return await this.userModel.query().findOne({ email });
  }

  /**
   * Finds a user by ID
   */
  async findById(id: number): Promise<UserShape> {
    return await this.userModel.query().findOne({ id: id });
  }

  /**
   * Updates user information
   *
   * @param { string } id - The ID of a user
   * @param { UserType } data - An object containing the details of the user to be updated
   */
  async update(id: number, data: UserType): Promise<UserType> {
    await this.userModel.query().patch(data).where({ id: id });
    const user = await this.userModel.query().findOne({ id: id });
    return this.obtainProfile(user);
  }
}
