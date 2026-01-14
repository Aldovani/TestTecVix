import { Request } from "express";
import { Multer } from "multer";

export interface CustomRequest<T> extends Request {
  user?: T;
  file?: Multer.File;
}
