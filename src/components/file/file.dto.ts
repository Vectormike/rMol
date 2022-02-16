import createValidator from '../../helpers/createValidator';

export class UploadFileValidator {
  fileValidator = createValidator((Joi) => {
    return {
      file: Joi.string().max(500).error(new Error('Image  ust be uploaded')).required().trim(),
    };
  });
}
