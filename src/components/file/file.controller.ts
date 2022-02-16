import { number } from '@hapi/joi';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import logger from '../../logger';
import { FileService } from './file.service';

export interface IFileController {
  uploadFile: RequestHandler;
  createFolder: RequestHandler;
  downloadFile: RequestHandler;
  markUnsafe: RequestHandler;
  markSafe: RequestHandler;
}

export function FileControllerFactory(fileService: FileService): IFileController {
  return {
    /**
     * Upload file
     */
    async uploadFile(req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        const { user, file } = req;
        const uploadedFile = await fileService.uploadFile(file, { currentUser: user });
        logger.info(JSON.stringify(uploadedFile));
        return res.status(httpStatus.OK).json({
          message: 'File successfully uploaded',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: uploadedFile,
        });
      } catch (error) {
        logger.info(JSON.stringify(error));
        next(error);
      }
    },

    /**
     * Create folder and upload file
     */
    async createFolder(req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        const { user, body, file } = req;
        const uploadedFile = await fileService.createFolder(body, file, { currentUser: user });
        logger.info(JSON.stringify(uploadedFile));
        return res.status(httpStatus.OK).json({
          message: 'File successfully uploaded',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: uploadedFile,
        });
      } catch (error) {
        logger.info(JSON.stringify(error));
        next(error);
      }
    },

    /**
     * Download file
     */
    async downloadFile(req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        const {
          user,
          params: { id },
        } = req;
        const fileInstance = await fileService.downloadFile(id, { currentUser: user });
        logger.info(JSON.stringify(fileInstance));
        return res.status(httpStatus.OK).json({
          message: 'File successfully uploaded',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: fileInstance,
        });
      } catch (error) {
        logger.info(JSON.stringify(error));
        next(error);
      }
    },

    /**
     * Mark Unsafe
     */
    async markUnsafe(req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        const {
          user,
          params: { id },
        } = req;
        const fileInstance = await fileService.markUnsafe(id, { currentUser: user });
        logger.info(JSON.stringify(fileInstance));
        return res.status(httpStatus.OK).json({
          message: 'File successfully marked unsafe',
          status: 'success',
          statusCode: httpStatus.OK,
        });
      } catch (error) {
        logger.info(JSON.stringify(error));
        next(error);
      }
    },

    /**
     * Mark Safe
     */
    async markSafe(req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        const {
          user,
          params: { id },
        } = req;
        const fileInstance = await fileService.markSafe(id, { currentUser: user });
        logger.info(JSON.stringify(fileInstance));
        return res.status(httpStatus.OK).json({
          message: 'File successfully marked safe',
          status: 'success',
          statusCode: httpStatus.OK,
        });
      } catch (error) {
        logger.info(JSON.stringify(error));
        next(error);
      }
    },
  };
}
