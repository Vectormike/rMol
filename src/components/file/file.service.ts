import { NextFunction, Response } from 'express';
import env from '../../helpers/env';
import Downloader from 'nodejs-file-downloader';
import dataUri from 'datauri/parser';
import cloudinary from '../../config/cloudinary';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import { File } from './file.model';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';
import { redisClient } from '../../redis.connection';
import logger from '../../logger';
import path from 'path';

export class FileService {
  constructor(private readonly fileModel = File) {}

  /**
   * Upload File
   *
   */
  async uploadFile(file: any, options?: ServiceMethodOptions): Promise<any> {
    try {
      const parser = new dataUri();
      const data = (file: { originalname: string; buffer: any }) => parser.format(path.extname(file.originalname).toString(), file.buffer);

      const fileResponse = data(file).content;

      const result = await cloudinary.v2.uploader.upload_large(fileResponse);

      const filePayload = {
        url: result.secure_url,
        user_id: options.currentUser.id,
      };

      const fileInstance = await this.fileModel.query().insert(filePayload);

      return fileInstance;
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Create folders to hold files
   *
   */
  async createFolder(body: any, file: any, options?: ServiceMethodOptions): Promise<any> {
    try {
      const parser = new dataUri();
      const data = (file: { originalname: string; buffer: any }) => parser.format(path.extname(file.originalname).toString(), file.buffer);

      const fileResponse = data(file).content;

      const result = await cloudinary.v2.uploader.upload_large(fileResponse, { folder: body.folder });

      const filePayload = {
        url: result.secure_url,
        user_id: options.currentUser.id,
      };

      const fileInstance = await this.fileModel.query().insert(filePayload);

      return fileInstance;
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Download File
   *
   */
  async downloadFile(id: string, options?: ServiceMethodOptions): Promise<any> {
    try {
      const fileInstance = await this.fileModel.query().where({ id, user_id: options.currentUser.id }).first();
      console.log(fileInstance);

      const downloader = new Downloader({
        url: fileInstance.url,
        directory: './downloads', //This folder will be created, if it doesn't exist.
      });
      await downloader.download(); //Downloader.download() returns a promise.

      console.log('All done');
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Mark files as unsafe
   *
   */
  async markUnsafe(id: string, options?: ServiceMethodOptions): Promise<any> {
    try {
      const fileInstance = await this.fileModel.query().findById(id);

      if (!fileInstance) {
        throw new NotFoundError('File does not exist');
      }

      if (fileInstance.safe_count === 3) {
        await this.fileModel.query().del().where({ id });
        return { message: 'File deleted!' };
      }

      await this.fileModel
        .query()
        .update({ safe: false, safe_count: ++fileInstance.safe_count })
        .where({ id });
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Mark files as safe
   *
   */
  async markSafe(id: string, options?: ServiceMethodOptions): Promise<any> {
    try {
      const fileInstance = await this.fileModel.query().findById(id);

      if (!fileInstance) {
        throw new NotFoundError('File does not exist');
      }

      if (fileInstance.safe === false) {
        await this.fileModel.query().update({ safe: true, safe_count: 0 }).where({ id });
        return;
      }
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }
}
