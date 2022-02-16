import { NextFunction, Response } from 'express';
import env from '../../helpers/env';
import Downloader from 'nodejs-file-downloader';
import dataUri from 'datauri/parser';
import cloudinary from '../../config/cloudinary';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import { File } from './file.model';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';
import { redisClient } from '../../redis.connection';
import sharp from 'sharp';
import { Readable } from 'stream';
import logger from '../../logger';
import path from 'path';
import { PartialModelObject } from 'objection';
import { error } from 'console';

export class FileService {
  constructor(private readonly fileModel = File) {}

  /**
   * Upload File
   *
   */
  async uploadFile(file: any, options?: ServiceMethodOptions): Promise<any> {
    try {
      const bufferToStream = (buffer: Buffer) => {
        const readable = new Readable({
          read() {
            this.push(buffer);
            this.push(null);
          },
        });
        return readable;
      };

      const data = await sharp(file.buffer).resize(320, 240).toBuffer();

      const stream = cloudinary.v2.uploader.upload_stream(async (error, result) => {
        if (result) {
          const filePayload = {
            url: result.secure_url,
            user_id: options.currentUser.id,
          };
          return await this.fileModel.query().insert(filePayload);
        }
      });

      bufferToStream(data).pipe(stream);
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
      return fileInstance;
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

  /**
   * Get file history
   *
   */
  async getFileHistory(options?: ServiceMethodOptions): Promise<any> {
    try {
      const filesInstance = await this.fileModel.query().select('url').where({ user_id: options.currentUser.id });
      return filesInstance;
    } catch (error) {
      logger.info(JSON.stringify(error));
      throw error;
    }
  }
}
