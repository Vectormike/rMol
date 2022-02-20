import createValidator, { IValidator } from '../../helpers/createValidator';

export class AuthValidator {
  CreateAccountDto = createValidator((Joi) => {
    return {
      email: Joi.string().required().trim().error(new Error('Email is required')),
      full_name: Joi.string().required().trim().error(new Error('Full name is required')),
      password: Joi.string().required().error(new Error('Password is required')),
      role: Joi.string().required().trim().error(new Error('Role is required')),
    };
  });

  LoginDto = createValidator((Joi) => {
    return {
      email: Joi.string().required().trim().error(new Error('Email is required')),
      password: Joi.string().required().error(new Error('Password is required')),
    };
  });

  ChangePasswordDto = createValidator((Joi) => {
    return {
      password: Joi.string().required().trim().error(new Error('Please enter a valid password')),
    };
  });

  RefreshTokenDto = createValidator((Joi) => {
    return {
      refreshToken: Joi.string().required().trim().error(new Error('Refresh token is required')),
    };
  });
}
