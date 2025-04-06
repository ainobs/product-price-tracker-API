import {NextFunction, Request, Response} from "express";
import createError from 'http-errors';

export const ValidatorService = (validator: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next()
      } catch (err: any) {
        if (err.isJoi) {
          if (process.env.NODE_ENV !== 'test') {
            console.log(err);
          }
          const response = {message: `Required field missing: ${err.details[0].message}..`
          };
          res.status(400).json({message: response.message});
        }
        next(createError(500));
      }
    }
  }