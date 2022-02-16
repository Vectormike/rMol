import { Router } from 'express';
import { IFileController } from './file.controller';
import { UploadFileValidator } from './file.dto';
import { ComponentRouterOptions } from '../../shared/types/ComponentRouterOptions';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: Infinity, files: 1 } });

export function FileRouter(options: ComponentRouterOptions<IFileController, UploadFileValidator>): Router {
  const { controller, guards, validator } = options;
  const router = Router();

  router.post('/upload', guards.AuthGuard({ strict: true }), upload.single('file'), controller.uploadFile);
  router.post('/folder', guards.AuthGuard({ strict: true }), upload.single('file'), controller.createFolder);
  router.get('/download/:id', guards.AuthGuard({ strict: true }), controller.downloadFile);
  router.patch('/mark-unsafe/:id', guards.AuthGuard({ strict: true }), controller.markUnsafe);
  router.patch('/mark-safe/:id', guards.AuthGuard({ strict: true }), controller.markSafe);

  return router;
}
