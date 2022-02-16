import Guards from '../../shared/guards';
import { FileControllerFactory } from './file.controller';
import { FileRouter } from './file.router';
import { FileService } from './file.service';

export const questionService = new FileService();

export const fileController = FileControllerFactory(questionService);

export const fileRouter = FileRouter({
  controller: fileController,
  guards: Guards,
});
